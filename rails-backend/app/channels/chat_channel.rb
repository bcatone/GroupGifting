class ChatChannel < ApplicationCable::Channel
    @@active_subscribers = {}

    def subscribed
        user_id = params[:user_id]
        puts "User subscribed with user_id: #{user_id}"
        stream_from "messages_#{user_id}"
        @@active_subscribers[user_id] = connection
    end

    def unsubscribed
        user_id = params[:user_id]
        @@active_subscribers.delete(user_id)
    end

    def receive(data)
        puts "Received #{data}"
    end

    def add_direct_message(data)
      puts "Creating a new message for #{data}..."
      sender_id = data["sender_id"]
      receiver_id = data["receiver_id"]
      content = data["content"]
    
      message = DirectMessage.create(sender_id: sender_id, receiver_id: receiver_id, content: content, type: "DirectMessage")
      formatted_message = format_message(message, sender_id, receiver_id)
    
      broadcast_data = { type: "message_created", message: formatted_message, sender_id: sender_id, receiver_id: receiver_id }
    
      if message.valid?
        ActionCable.server.broadcast("messages_#{sender_id}", broadcast_data)
        ActionCable.server.broadcast("messages_#{receiver_id}", broadcast_data)
      else
        ActionCable.server.broadcast("messages_#{sender_id}", { error: "Failed to send message" })
      end
    end

    def delete_direct_message(data)
      puts "Deleting #{data}..."
      puts "id: #{data["id"]}"
      message_id = data["id"]

      message = DirectMessage.find(message_id)
      sender = message.sender
      receiver = message.receiver

      message.destroy

      sender_broadcast_data = { type: 'message_deleted', message_id: message_id, conversation_info: DirectMessage.conversation_info(sender, receiver) }
      receiver_broadcast_data = { type: 'message_deleted', message_id: message_id, conversation_info: DirectMessage.conversation_info(receiver, sender) }

      ActionCable.server.broadcast("messages_#{message.sender_id}", sender_broadcast_data)
      ActionCable.server.broadcast("messages_#{message.receiver_id}", receiver_broadcast_data)
    end
    
    private

    def format_message(message, sender_id, receiver_id)
      sender = User.find(sender_id)
      receiver = User.find(receiver_id)
    
      formatted_message = {
        id: message.id,
        sender: {
          id: sender.id,
          username: sender.username,
          avatar: sender.avatar_url
        },
        content: message.content,
        direction: message_direction(message, sender_id, receiver_id),
        created_at: message_created_at(message)
      }
      formatted_message
    end
    
    def message_direction(message, sender_id, receiver_id)
      if message.sender_id == sender_id
        'sent'
      elsif message.receiver_id == receiver_id
        'received'
      else
        'unknown'
      end
    end
    
      def message_created_at(message)
        message.format_date(message.created_at)
      end
end
