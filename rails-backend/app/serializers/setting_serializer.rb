class SettingSerializer < ActiveModel::Serializer
  attributes :id, :name, :value, :configurable_type, :configurable_id


  # took out :give_method
end
