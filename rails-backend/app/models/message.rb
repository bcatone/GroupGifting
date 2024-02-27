class Message < ApplicationRecord
    belongs_to :sender, class_name: 'User'

    has_many :settings, as: :configurable

    # enum message_type: { direct_message: 0, group_message: 1 }
end
