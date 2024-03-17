class ItemsController < ApplicationController
      before_action :force_json, only: :search
#   before_action :authorize

#   def index
#     items = Item.all.with_attached_picture.includes(:user)
#     render json: items, include: { user: { only: [:id, :username] } }
#   end

# def index
#   @q = Person.ransack(params[:q])
#   @people = @q.result(distinct: true)
# end



# either how can I make this dynamic with distance or how can I make another method that will return all items?
# def index
#   @current_user = User.find_by(id: session[:user_id])
#   nearby_items = Item.near("#{@current_user.zip}", 6, order: :distance)
#   Rails.logger.debug nearby_items

#   render json: nearby_items
# end

# eventually get the zip from fetching it for users not logged in
def index
  if params[:distance].present? && params[:distance].to_i > 0
    @items = Item.near(current_user.zip, params[:distance].to_i)
  else
    @items = Item.all
  end
  render json: @items
end


  def show
    item = Item.find_by(id: params[:id])
    render json: item
  end

  def create
    @current_user = User.find_by(id: session[:user_id])

    if @current_user
      new_item = @current_user.items.build(item_params)

      if new_item.save
        render json: new_item
      else
        render json: { errors: new_item.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "User not found" }, status: :unprocessable_entity
    end
  end

  def update
    item = find_item

    if item.update(item_params)
      render json: item
    else
      render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    item = find_item
    item.destroy
    render json: { message: "Item successfully destroyed" }
  end

  def search
  @query = params[:q]&.downcase
  @distance = params[:distance].to_i

  if @query.present?
    if @distance > 0
      # Fetch items within the specified distance using geocoder gem
      @items = Item.near(params[:q], @distance)
                  .where("LOWER(title) LIKE ? OR LOWER(description) LIKE ?", "%#{@query}%", "%#{@query}%")
    else
      # If distance is not specified, perform search without distance filter
      @items = Item.where("LOWER(title) LIKE ? OR LOWER(description) LIKE ?", "%#{@query}%", "%#{@query}%")
    end
    render json: @items
  else
    render json: [], status: :ok
  end
end




def filter
  @category = params[:category]
  @distance = params[:distance].to_i

  if @category.present?
    if @distance > 0

      @items = Item.by_category(@category)
                  .near(current_user.zip, @distance)
    else
      @items = Item.by_category(@category)
    end
    render json: @items
  else
    render json: [], status: :ok
  end
end

  private

  def force_json
    request.format = :json
  end




  def find_item
    @current_user = User.find_by(id: session[:user_id])
    item = @current_user.items.find_by(id: params[:id])
  end

  def item_params
    params.require(:item).permit(:title, :description, :status, :location, :recipient_id, :suggested_donation_amount, :is_public, :deadline, images: [])
  end

#   took out images: []

end

# def search
#         @query = params[:q]&.downcase
#     if @query.present?
#       @items = Item.where("LOWER(title) LIKE ? OR LOWER(description) LIKE ?", "%#{@query}%", "%#{@query}%")
#       render json: @items
#     else
#       render json: [], status: :ok
#     end
#   end