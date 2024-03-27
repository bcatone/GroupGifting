class ItemSerializer < ActiveModel::Serializer
   include Rails.application.routes.url_helpers
  attributes :id, :title, :description, :status, :zip, :user_id, :recipient_id, :suggested_donation_amount, :is_public, :formatted_deadline, :images, :time_until_deadline, :category, :short_description, :city

  def images
    if object.images.attached?
      object.images.map do |image|
        rails_blob_path(image, only_path: true)
      end
    else
      []
    end
  end

    def short_description
    object.description.nil? ? "" : object.description.length < 100 ? object.description : "#{object.description[0..100]}..."
  end


    def formatted_deadline
    object.deadline.strftime("%A, %I:%M %p, %B %e, %Y") if object.deadline.present?
  end

  def time_until_deadline
start_time = Time.now
  end_time = object.deadline

  TimeDifference.between(start_time, end_time).in_general
  end


end

