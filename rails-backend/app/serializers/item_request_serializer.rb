class ItemRequestSerializer < ActiveModel::Serializer
     include Rails.application.routes.url_helpers
  belongs_to :user
  belongs_to :item
  attributes :user_id, :item_id, :created_at, :id, :item_images

    def item_images
    if object.item.images.attached?
      object.item.images.map do |image|
        rails_blob_path(image, only_path: true)
      end
    else
      puts "no images attached"
      []
    end
  end

end
