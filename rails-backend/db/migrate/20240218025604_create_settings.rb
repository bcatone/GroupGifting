class CreateSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :settings do |t|
      t.string :name
      t.text :value
      t.string :configurable_type
      t.integer :configurable_id

      t.timestamps
    end
  end
end
