class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :first_name, :last_name, :city, :state, :zip, :avatar_url
end
