class InboxController < ApplicationController

    def direct_messages
        @inbox_data = DirectMessage.fetch_inbox_data(current_user)
        render json: @inbox_data, status: :ok
    end

end
