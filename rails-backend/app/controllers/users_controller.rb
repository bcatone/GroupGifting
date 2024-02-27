class UsersController < ApplicationController
    include LocationApiRequestHelper
    include ModelFilteringHelper
    skip_before_action :authorized_user, only: [:index, :show, :create]

    def index
        users = filter_by_attributes(User, params)
        render json: users, status: :ok
    end

    def show
        # Render the user's own user data
        if params[:id] == current_user.id
            render json: current_user, serializer: CurrentUserSerializer, status: :ok

        # Render data for other users (connections, etc.)
        else
            user = User.find(params[:id])
            render json: user, status: :ok
        end
    end

    def create
        puts "password: #{params[:password]}"
        puts "password confimration: #{params[:password_confirmation]}"

        user = User.create!(user_params)

        # Set a default avatar if the user does not select an image
        if !user.avatar.attached?
            user.attach_default_avatar
        end

        if params[:zip]
            location = get_location_data_from_zip(params[:zip])

            User.update!(city: location["address"]["city"], state: location["address"]["state"])
        end

        render json: user, serializer: CurrentUserSerializer, status: :created
    end

    def update

        # Delete existing avatar if changed
        if params[:avatar]
            current_user.avatar.purge
        end

        current_user.update!(user_params)

        if !current_user.avatar.attached?
            current_user.attach_default_avatar
        end

        render json: user, serializer: CurrentUserSerializer, status: :accepted
    end

    def destroy
        user = User.find_by(id: params[:id])

        if user&.authenticate(params[:password])
            user.destroy
        end

        head :no_content
    end

    private

    def user_params
        params.require(:user).permit(:email, :username, :password, :password_confirmation, :email, :first_name, :last_name, :city, :state, :zip, :avatar)
    end
end
