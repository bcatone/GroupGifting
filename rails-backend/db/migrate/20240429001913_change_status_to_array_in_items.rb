class ChangeStatusToArrayInItems < ActiveRecord::Migration[7.1]
  def up
    add_column :items, :status_array, :text, array: true, default: []
    
    Item.find_each do |item|
      item.status_array = [item.status]
      item.save!
    end
    
    remove_column :items, :status
    rename_column :items, :status_array, :status
  end

  def down
    add_column :items, :status_string, :string
    
    Item.find_each do |item|
      item.status_string = item.status.first
      item.save!
    end
    
    remove_column :items, :status
    rename_column :items, :status_string, :status
  end
end