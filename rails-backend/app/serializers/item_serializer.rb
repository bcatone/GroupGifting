class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :location, :recipient_id, :suggested_donation_amount, :is_public, :deadline, images: []
end
