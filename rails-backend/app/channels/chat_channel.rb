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
    
      message = DirectMessage.create(sender_id: sender_id, receiver_id: receiver_id, content: content, receiver_type: "User")
      formatted_message = format_message(message, sender_id, receiver_id)
    
      broadcast_data = { type: "message_created", message: formatted_message }
      # broadcast_data = { type: "message_created", message: message }

      if message.valid?
        ActionCable.server.broadcast("messages_#{sender_id}", broadcast_data)
        ActionCable.server.broadcast("messages_#{receiver_id}", broadcast_data)
      else
        ActionCable.server.broadcast("messages_#{sender_id}", { error: "Failed to send message" })
      end
    end

    def edit_direct_message(data)
      puts "Editing #{data}..."
      id = data["id"]
      content = data["content"]

      message = DirectMessage.find(id)
      message.update!(content: content)
      formatted_message = format_message(message, message.sender.id, message.receiver.id)
      puts formatted_message

      broadcast_data = { type: "message_updated", message: formatted_message}
      
      ActionCable.server.broadcast("messages_#{message.sender.id}", broadcast_data)
      ActionCable.server.broadcast("messages_#{message.receiver.id}", broadcast_data)
    end

    def delete_direct_message(data)
      puts "Deleting #{data}..."
      puts "id: #{data["id"]}"
      message_id = data["id"]

      message = DirectMessage.find(message_id)
      sender = message.sender
      receiver = message.receiver

      is_unread_by_sender = message.is_viewed(sender)
      is_unread_by_receiver = message.is_viewed(receiver)

      message.destroy

      sender_broadcast_data = { type: 'message_deleted', message_id: message_id, conversation_info: DirectMessage.conversation_info(sender, receiver), was_viewed: is_unread_by_sender }
      receiver_broadcast_data = { type: 'message_deleted', message_id: message_id, conversation_info: DirectMessage.conversation_info(receiver, sender), was_viewed: is_unread_by_receiver }

      ActionCable.server.broadcast("messages_#{message.sender_id}", sender_broadcast_data)
      ActionCable.server.broadcast("messages_#{message.receiver_id}", receiver_broadcast_data)
    end
    
    private

    def format_message(message, sender_id, receiver_id)
      sender = User.find(sender_id)
      receiver = User.find(receiver_id)

      direction = message_direction(message, sender_id, receiver_id)
    
      formatted_message = {
        id: message.id,
        sender_id: sender.id,
        receiver_id: receiver.id,
        avatar_url: sender.avatar_url,
        username: sender.username,
        content: message.content,
        direction: direction,
        is_viewed: is_viewed(direction, receiver),
        created_at: message_created_at(message),
        updated_at: message.updated_at,
        used_format_message_method_debug: true
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

      def is_viewed(direction, receiver)
        is_viewed = case(direction)
        when "sent"
          return true
        when "received"
          return Message.is_viewed(receiver)
        else
          puts "THERE IS A PROBLEM WITH THE is_viewed METHOD IN CHAT_CHANNEL!"
          return false;
        end
      end
end
