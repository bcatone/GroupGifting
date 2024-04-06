class DirectMessage < Message
    belongs_to :receiver, class_name: 'User'

    def self.between_users(user1_id, user2_id)
        self.where("(sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)", user1_id, user2_id, user2_id, user1_id)
    end

    def other_user(current_user)
        sender_id == current_user.id ? receiver : sender
    end

    def self.fetch_inbox_data(user)
        conversation_data = []
        total_num_unread = 0
  
        user.direct_messages.includes(:sender, :receiver).group_by { |message| message.other_user(user) }.each do |other_user, messages|
          last_message = messages.max_by(&:created_at)
          num_unread = messages.count { |message| message.is_viewed(user) == false}
  
          conversation_data << conversation_info(user, other_user)
          total_num_unread += num_unread
        end
  
        inbox_data = {
          total_num_unread: total_num_unread,
          conversation_data: conversation_data
        }
      inbox_data
      end
  
    def self.conversation_info(user, other_user)
      messages = between_users(user, other_user)
      last_message = messages.max_by(&:created_at)
      num_unread = messages.count { |message| !message.is_viewed(user) }
  
      {
        user_id: other_user.id,
        other_user_id: other_user.id,
        username: other_user.username,
        last_updated: last_message&.format_date(last_message.created_at),
        last_message_id: last_message&.id,
        content_preview: last_message&.content_preview,
        is_viewed: last_message&.is_viewed(user),
        num_unread: num_unread
      }
    end

    def is_viewed(user)
      is_viewed = MessageView.find_or_create_by(user: user, message: self).is_viewed
      is_viewed
    end

end
