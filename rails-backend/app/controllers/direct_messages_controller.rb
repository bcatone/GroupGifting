class DirectMessagesController < ApplicationController

    def index

        user = User.find_by(id: params[:user_id])

        if !user
            render json: { error: "Invalid user ID" }, status: :unprocessable_entity
        end

        direct_messages = DirectMessage.between_users(current_user.id, params[:user_id])

        render json: direct_messages.order(:created_at), status: :ok
    end

    def update
        direct_message = DirectMessage.find(params[:id])
        direct_message.update!(direct_message_params)
        render json: direct_message, status: :accepted
    end
    
    private

    def direct_message_params
        params.require(:direct_message).permit(:content, :sender_id, :receiver_id)
    end

end
