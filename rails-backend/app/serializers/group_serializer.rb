class GroupSerializer < ActiveModel::Serializer
  attributes :id, :group_host_id, :name, :description
end
