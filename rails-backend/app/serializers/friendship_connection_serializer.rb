class FriendshipConnectionSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :receiver_id, :status
end
