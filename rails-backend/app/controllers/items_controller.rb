class ItemsController < ApplicationController
      before_action :force_json, only: :search
#   before_action :authorize


# eventually get the zip from fetching it for users not logged in
def index
  if params[:distance].present? && params[:distance].to_i > 0
    @items = Item.near(current_user.zip, params[:distance].to_i).with_attached_images
  else
    @items = Item.all.with_attached_images
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

    new_item.images.attach(params[:images])


    if new_item.save
      # Create a new Setting associated with the item and use the giving_method value from params
      new_item.settings.create(name: 'give_method', value: params[:give_method])
      
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
  params.permit(:title, :description, :status, :zip, :recipient_id, :suggested_donation_amount, :category, :city, :is_public, :deadline, images: [])
end

end

