class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :first_name, :last_name, :city, :state, :zip, :avatar, :avatar_thumbnail
  has_many :items

   has_many :item_requests
  # has_many :requested_items, through: :requested_items, source: :item

    def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end


  def avatar_thumbnail
  if object.avatar.attached?
    begin
      variant = object.avatar.variant(resize_to_limit: [200, 200]).processed
      rails_representation_url(variant, only_path: true)
    rescue ActiveStorage::FileNotFoundError
      nil
    end
  end
end
end
