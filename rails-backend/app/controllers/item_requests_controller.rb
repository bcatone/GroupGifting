class ItemRequestsController < ApplicationController
  
  def index
    user = User.find(params[:user_id])
    item_requests = user.item_requests
    render json: item_requests
  end
  
def create
  user = User.find(params[:user_id])
  item = Item.find(params[:item_id])
  
  # Check if the user has already created a request for this item
  if user.item_requests.exists?(item_id: item.id)
    render json: { error: "User already has a request for this item" }, status: :unprocessable_entity
  else
    # Create a new item request if the user hasn't created one for this item
    item_request = user.item_requests.create(item: item)
    render json: item_request, status: :created
  end
end


  def destroy
    item_request = ItemRequest.find(params[:id])
    item_request.destroy
    head :no_content
  end

end
