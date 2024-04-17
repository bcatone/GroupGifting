class Item < ApplicationRecord
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many_attached :images, dependent: :destroy
    has_many :settings, as: :configurable
    
    has_many :item_requests

    scope :by_category, ->(category) { where(category: category) if category.present? }

    geocoded_by :zip
    after_validation :geocode
    reverse_geocoded_by :latitude, :longitude,
    :address => :zip

def give_method
    setting = settings.find_by(name: "give_method")
    if setting 
      return setting.value
    else
      Rails.logger.info("No give method setting found for item #{id}")
      return nil
    end
  end

  def username
    self.user.username
  end

end





