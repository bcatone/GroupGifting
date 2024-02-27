class SessionsController < ApplicationController
    skip_before_action :authorized_user, only: [:create]

    def show
        render json: current_user, status: :ok
    end

    def create
        puts "email: #{params[:email]}"
        puts "password: #{params[:password]}"

        user = User.find_by(email: params[:email])

        puts "User:"
        puts user

        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: current_user, status: :created
        else 
            puts "Invalid username or password entered"
            render json:{ error: "Invalid username or password"}, status: :unauthorized
        end
    end

    def destroy
        session.delete :user_id
        head :no_content 
    end
    
end
