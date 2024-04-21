class RemoveRequestedUsersFromItems < ActiveRecord::Migration[7.1]
  def change
    remove_column :items, :requested_users
  end
end
