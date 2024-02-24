class FriendshipConnection < ApplicationRecord
    belongs_to :sender, class_name: 'User'
    belongs_to :receiver, class_name: 'User'
    
    validates :sender_id, uniqueness: { scope: :receiver_id, message: "Friendship request already sent" }
    validate :not_self

    def not_self
        errors.add(:receiver_id, "Friendship cannot be created with self") if sender_id == receiver_id
    end
end
