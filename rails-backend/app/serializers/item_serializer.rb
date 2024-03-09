class ItemSerializer < ActiveModel::Serializer
   include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :status, :location, :user_id, :recipient_id, :suggested_donation_amount, :is_public, :formatted_deadline, :images, :time_until_deadline, :category

  def images
    if object.images.attached?
      object.images.map do |image|
        rails_blob_path(image, only_path: true)
      end
    else
      []
    end
  end




    def formatted_deadline
    object.deadline.strftime("%A, %I:%M %p, %B %e, %Y") if object.deadline.present?
  end

  def time_until_deadline
start_time = Time.now
  end_time = object.deadline

  TimeDifference.between(start_time, end_time).in_general
  end

#   start_time = Time.new(2013,1)
# end_time = Time.new(2014,1)

# TimeDifference.between(start_time, end_time).in_general
# => {:years=>0, :months=>12, :weeks=>0, :days=>5, :hours=>0, :minutes=>0, :seconds=>0}


end

