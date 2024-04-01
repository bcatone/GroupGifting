class Setting < ApplicationRecord
    belongs_to :configurable, polymorphic: true
end
