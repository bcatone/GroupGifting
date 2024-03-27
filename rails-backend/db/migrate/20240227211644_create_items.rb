class CreateItems < ActiveRecord::Migration[7.1]
  def change
    create_table :items do |t|
       t.string :title
      t.text :description
      t.string :category
      t.integer :location
      t.string :status
      t.bigint :recipient_id
      t.integer :suggested_donation_amount
      t.string :is_public
      t.datetime :deadline
      t.timestamps
    end
  end
end
