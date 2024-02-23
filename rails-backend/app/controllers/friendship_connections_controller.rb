class FriendshipConnectionsController < ApplicationController
    include ModelFilteringHelper

    def index
        @friendship_connections = current_user.friendship_connections
        render json: @friendship_connections, status: :ok
    end

    def create
        friend = User.find(params[:friend_id])
        new_friendship_connection = FriendShipConnection.create!(sender: current_user, receiver: friend)
        render json: new_friendship_connection, status: :ok
    end

    def update
        friend = User.find(params[:friend_id])
        updated_friendship_connection = FriendShipConnection.find_by!(sender: friend, receiver: current_user)
        friendship_connection.update!(status: params[:status])
    end

    def accept_friend_request
        friend = User.find(params[:friend_id])
        updated_friendship_connection = FriendShipConnection.find_by!(sender: friend, receiver: current_user)
        friendship_connection.update!(status: "accepted")
        render json: updated_friendship_connection, status: :accepted
    end
    
end
