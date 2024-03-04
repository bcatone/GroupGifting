class MessagesController < ApplicationController
    
    def update_is_viewed
        message_view = MessageView.find_or_create_by!(user_id: params[:user_id], message_id: params[:message_id])
        message_view.update!(is_viewed: params[:is_viewed] || true)

        render json: message_view.message, status: :accepted
    end
end
