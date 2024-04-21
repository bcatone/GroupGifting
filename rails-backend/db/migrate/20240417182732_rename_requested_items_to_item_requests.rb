class RenameRequestedItemsToItemRequests < ActiveRecord::Migration[7.1]
  def change
    rename_table :requested_items, :item_requests
  end
end
