class CreateMessageViews < ActiveRecord::Migration[7.1]
  def change
    create_table :message_views do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :message, null: false, foreign_key: true
      t.boolean :is_viewed, default: false

      t.timestamps
    end
  end
end
