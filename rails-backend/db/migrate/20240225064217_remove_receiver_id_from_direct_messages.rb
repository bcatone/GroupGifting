class RemoveReceiverIdFromDirectMessages < ActiveRecord::Migration[7.1]
  def change
    remove_column :direct_messages, :receiver_id, :integer
  end
end
