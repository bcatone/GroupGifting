class Group < ApplicationRecord
    belongs_to :group_host, class_name: 'User'

    has_many :settings, as: :configurable

    has_many :group_memberships, dependent: :destroy
    has_many :users, through: :group_memberships
end
