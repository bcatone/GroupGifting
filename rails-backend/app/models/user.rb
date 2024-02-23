class User < ApplicationRecord

    has_secure_password

    has_one_attached :avatar, dependent: :destroy

    has_many :settings, as: :configurable

    has_many :sent_friendship_connections, class_name: 'FriendshipConnection', foreign_key: 'sender_id', dependent: :destroy
  has_many :received_friendship_connections, class_name: 'FriendshipConnection', foreign_key: 'receiver_id', dependent: :destroy

    has_many :group_memberships, dependent: :destroy
    has_many :groups, through: :group_memberships

    has_many :messages

    def attach_default_avatar
        self.avatar.attach(
            io: File.open('./public/images/default-avatar.jpg'),
            filename: 'default-avatar.jpg',
            content_type: 'application/png'
        )
    end

end
