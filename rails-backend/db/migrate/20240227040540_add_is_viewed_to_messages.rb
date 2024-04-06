class AddIsViewedToMessages < ActiveRecord::Migration[7.1]
  def change
    add_column :messages, :is_viewed, :boolean, default: false
  end
end
