class AddOwnerIdToItems < ActiveRecord::Migration[7.1]
  def change
    add_column :items, :owner_id, :bigint
  end
end
