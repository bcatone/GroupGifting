class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :location, :user_id, :recipient_id, :suggested_donation_amount, :is_public, :deadline, :images

  def images
    object.images.map do |image|
      rails_blob_path(image, only_path: true) if image.attached?
    end
  end


end

