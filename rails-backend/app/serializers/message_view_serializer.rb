class MessageViewSerializer < ActiveModel::Serializer
  attributes :id, :is_viewed, :message_view_id
  has_one :user
  has_one :message
end
