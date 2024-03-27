class DirectMessageSerializer < ActiveModel::Serializer
  attributes :id, :sender, :content, :direction, :created_at, :is_viewed

  def sender
    sender = self.object.sender

    sender_data = {
      id: sender.id,
      username: sender == current_user ? "You" : sender.username,
      avatar: sender.avatar_url
    }
  end

  def created_at
    self.object.format_date(self.object.created_at)
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

  def is_viewed
    self.object.is_viewed(current_user)
  end

end


