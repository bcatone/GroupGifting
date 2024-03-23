# db/migrate/[timestamp]_rename_location_to_zip_in_items.rb
class RenameLocationToZipInItems < ActiveRecord::Migration[6.0]
  def change
    rename_column :items, :location, :zip
  end
end

