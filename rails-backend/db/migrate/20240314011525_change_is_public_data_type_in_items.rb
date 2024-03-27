class ChangeIsPublicDataTypeInItems < ActiveRecord::Migration[6.0]
  def change
    change_column :items, :is_public, :boolean, using: 'is_public::boolean'
  end
end

