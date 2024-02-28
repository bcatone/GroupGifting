# db/migrate/[timestamp]_rename_owner_id_to_user_id.rb

class RenameOwnerIdToUserId < ActiveRecord::Migration[7.1]
  def change
    rename_column :items, :owner_id, :user_id
  end
end
