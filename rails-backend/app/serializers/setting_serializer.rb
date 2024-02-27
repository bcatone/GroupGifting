class SettingSerializer < ActiveModel::Serializer
  attributes :id, :name, :value, :configurable_type, :configurable_id
end
