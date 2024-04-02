class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :item_id, :content
  belongs_to :item
end
