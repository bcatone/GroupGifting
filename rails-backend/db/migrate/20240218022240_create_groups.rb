class CreateGroups < ActiveRecord::Migration[7.1]
  def change
    create_table :groups do |t|
      t.integer :group_host_id, null: false
      t.string :name
      t.text :description

      t.timestamps
    end

    add_index :groups, :group_host_id
  end
end
