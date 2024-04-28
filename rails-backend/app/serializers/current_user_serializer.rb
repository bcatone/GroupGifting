class CurrentUserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :email, :username, :first_name, :last_name, :city, :state, :zip, :avatar_url

# In the future move this into a place where both user and currentuser serializers can get it
  def avatar_url
    object.avatar_url
  end


end
