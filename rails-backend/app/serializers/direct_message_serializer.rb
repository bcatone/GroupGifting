class DirectMessageSerializer < ActiveModel::Serializer
  attributes :id, :other_user_id, :sender_id, :receiver_id, :avatar_url, :username, :content, :direction, :is_viewed

  def other_user_id
    self.object.other_user(current_user).id
  end

  def avatar_url
    avatar_url = self.object.sender.avatar_url
  end

  def username
    sender = self.object.sender
    username = sender == current_user ? "You" : sender.username
    username
  end  
  
  def direction
    if self.object.sender == current_user
      'sent'
    elsif self.object.receiver == current_user
      'received'
    else
      'unknown'
    end
  end

  def created_at
    self.object.format_date(self.object.created_at)
  end

  def is_viewed
    if current_user
      self.object.is_viewed(current_user)
    else
      puts "There is an issue with current_user"
      return true
    end
  end

end


