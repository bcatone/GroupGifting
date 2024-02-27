class GroupMembership < ApplicationRecord
  belongs_to :user
  belongs_to :group

  def user_friends_with_group_host?
    group_host_id = self.group.group_host_id

    friendship = FriendshipConnection.find_by(
      "(sender_id = :user_id AND receiver_id = :group_host_id OR sender_id = :group_host_id AND receiver_id = :user_id) AND status = 'accepted'",
      user_id: user.id,
      group_host_id: group_host_id
    )

    !!friendship
  end
end
