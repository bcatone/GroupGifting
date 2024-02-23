class DirectMessagesController < ApplicationController

    def index
    end

    def show
    end
    
    private

    def direct_message_params
        params.require(:direct_message).permit(:content, :sender_id, :receiver_id)
    end

end
