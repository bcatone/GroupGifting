class CommentsController < ApplicationController
     skip_before_action :authorized_user
    #  // show index for unauthorized user?

    def create
        newComment = @authorized_user.comments.create!(comment_params)
        render json: newComment
    end

    def index
      render json: Comment.all
    end

    def update
        comment = find_comment
        comment.update(comment_params)
        render json: comment
    end

    def destroy
      comment = find_comment
      comment.destroy
      head :no_content
    end

    private

    def find_comment
        comment = @authorized_user.comments.find_by(id: params[:id])
      end
    
      def comment_params
        params.require(:comment).permit(:id, :user_id, :item_id, :content)
      end
end
