class Item < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many_attached :images, dependent: :destroy

    scope :by_category, ->(category) { where(category: category) if category.present? }

    geocoded_by :zip
    after_validation :geocode
    reverse_geocoded_by :latitude, :longitude,
    :address => :zip
end





