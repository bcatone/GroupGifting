class DirectMessage < Message
    belongs_to :receiver, class_name: 'User'
end
