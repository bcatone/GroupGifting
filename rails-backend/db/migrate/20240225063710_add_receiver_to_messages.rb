class AddReceiverToMessages < ActiveRecord::Migration[7.1]
  def change
    add_reference :messages, :receiver, polymorphic: true, index: true
  end
end
