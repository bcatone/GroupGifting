class Message < ApplicationRecord
    belongs_to :sender, class_name: 'User', foreign_key: 'sender_id'
    belongs_to :recipient, polymorphic: true, optional: true

    has_many :settings, as: :configurable

    has_many :message_views, dependent: :destroy
    has_many :users, through: :message_views

    def format_date(datetime)
        today = Date.today
        yesterday = today - 1
      
        if datetime.to_date == today
          formatted_datetime = "Today at #{datetime.strftime('%I:%M %p')}"
        elsif datetime.to_date == yesterday
          formatted_datetime = "Yesterday at #{datetime.strftime('%I:%M %p')}"
        else
          formatted_datetime = datetime.strftime('%m/%d/%Y %I:%M %p')
        end
      
        formatted_datetime
    end

    def content_preview(num_chars = 50)
        content_preview = self.content
        content_preview = "#{content_preview.slice(0, num_chars)}..." if content_preview.length > num_chars
        content_preview
    end

    def is_viewed(user)
      is_viewed = MessageView.find_by(user: user, message: self).is_viewed
      is_viewed
    end

end
