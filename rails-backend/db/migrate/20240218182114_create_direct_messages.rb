class CreateDirectMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :direct_messages do |t|
      t.references :receiver, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
