class User < ApplicationRecord

    has_secure_password

    has_one_attached :avatar, dependent: :destroy

    has_many :settings, as: :configurable

    has_many :sent_friendship_connections, class_name: 'FriendshipConnection', foreign_key: 'sender_id', dependent: :destroy
    has_many :received_friendship_connections, class_name: 'FriendshipConnection', foreign_key: 'receiver_id', dependent: :destroy
    scope :with_friendship_connections, -> { joins(:sent_friendship_connections).or(joins(:received_friendship_connections)).distinct }

    has_many :group_memberships, dependent: :destroy
    has_many :groups, through: :group_memberships

    has_many :sent_direct_messages, class_name: 'DirectMessage', foreign_key: 'sender_id', dependent: :destroy
    has_many :received_direct_messages, class_name: 'DirectMessage', foreign_key: 'receiver_id', dependent: :destroy
    scope :with_direct_messages, -> { joins(:sent_direct_messages).or(joins(:received_direct_messages)).distinct }

    has_many :message_views, dependent: :destroy
    has_many :messages, through: :message_views

    validates :email, presence: true, uniqueness: true
    validates :username, length: { in: 3..25 }

    def attach_default_avatar
        self.avatar.attach(
            io: File.open('./public/images/default-avatar.jpg'),
            filename: 'default-avatar.jpg',
            content_type: 'application/png'
        )
    end

    def avatar_url
        if self.avatar.attached?
            Rails.application.routes.url_helpers.url_for(user.avatar)
        else
            ""
        end
    end

    def friendship_connections
        friendship_connections = FriendshipConnection.where(sender_id: id).or(FriendshipConnection.where(receiver_id: id))
    end

    def direct_messages
        direct_messages = DirectMessage.where(sender_id: id).or(DirectMessage.where(receiver_id: id))
    end

end
