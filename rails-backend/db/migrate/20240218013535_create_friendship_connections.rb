class CreateFriendshipConnections < ActiveRecord::Migration[7.1]
  def change
    create_table :friendship_connections do |t|
      t.integer :sender_id, null: false
      t.integer :receiver_id, null: false
      t.string :status, default: "pending"

      t.timestamps
    end

    add_index :friendship_connections, :sender_id
    add_index :friendship_connections, :receiver_id
    add_index :friendship_connections, [:sender_id, :receiver_id], unique: true
  end
end
