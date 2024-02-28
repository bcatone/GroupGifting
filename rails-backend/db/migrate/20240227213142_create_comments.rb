class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.bigint :user_id
      t.bigint :item_id
      t.string :content
      t.timestamps
    end
  end
end

