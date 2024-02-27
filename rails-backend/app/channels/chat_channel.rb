class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages_#{current_user.id}"
    @@active_subscribers[current_user.id] = connection
  end

  def unsubscribed
    @@active_subscribers.delete(current_user.id)
  end

  def receive(data)

    # Handle incoming message based on the message type
    case data["message_type"]
    when "direct_message"
      handle_direct_message(data)
    when "group_message"
      handle_group_message(data)
    else
      puts "Unknown message type"
    end
  end
  
  private

  def handle_direct_message(data)
    sender_id = data["sender_id"]
    receiver_id = data["receiver_id"]
    content = data["content"]

    message = DirectMessage.create(sender_id: sender_id, receiver_id: receiver_id, content: content)

    if message.valid?
      ActionCable.server.broadcast("messages_#{sender_id}", message: message)
      ActionCable.server.broadcast("messages_#{receiver_id}", message: message)
    else
      ActionCable.server.broadcast("messages_#{sender_id}", error: "Failed to send message")
    end
  end

  def handle_group_message(data)
    
  end

  def edit_message(data)
    message_id = data["message_id"]
    content = data["content"]

    message = Message.find_by(id: message_id)

    ActionCable.server.broadcast("messages_#{sender_id}", error: "An error occured while updating this message") unless message

    message.update(content: content)

    ActionCable.server.broadcast("messages_#{message.sender_id}", message: message)

    case data["message_type"]
    when "direct_message"
      ActionCable.server.broadcast("messages_#{receiver_id}", message: message)
    when "group_message"
      
    else
      puts "Unknown message type"
    end
  end

  def delete_message
    message_id = data["message_id"]

    message = Message.find_by(id: message_id)

    ActionCable.server.broadcast("messages_#{sender_id}", error: "Unable to delete message") unless message

    message.destroy
    ActionCable.server.broadcast("messages_#{message.sender_id}", deleted_message_id: message_id)

    case data["message_type"]
    when "direct_message"
      ActionCable.server.broadcast("messages_#{message.receiver_id}", deleted_message_id: message_id)
    when "group_message"
      handle_group_message(data)
    else
      puts "unknown message type"
    end

  end

end
