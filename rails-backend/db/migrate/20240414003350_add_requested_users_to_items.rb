class AddRequestedUsersToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :requested_users, :integer, array: true, default: []
  end
end