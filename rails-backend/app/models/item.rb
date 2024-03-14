class Item < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many_attached :images, dependent: :destroy

    scope :by_category, ->(category) { where(category: category) if category.present? }

    geocoded_by :location
    after_validation :geocode
    reverse_geocoded_by :latitude, :longitude,
    :address => :location
end


# Item.find_each do |item|
#   begin

#     if item.location.present?

#       address_string = item.reverse_geocode
# address_string.to_array

#       if item.city.present?

#         item.save
#       else
#         puts "City information not found for Item ID: #{item.id}"
#       end
#     else
#       puts "Latitude and/or longitude missing for Item ID: #{item.id}"
#     end
#   rescue StandardError => e
#     puts "Error geocoding Item ID: #{item.id}: #{e.message}"
#   end
# end


