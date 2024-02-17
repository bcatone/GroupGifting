class ApplicationController < ActionController::API
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::ConnectionNotEstablished, with: :render_connection_not_established_response
    include ActionController::Cookies

    def test
        render json: { message: "Hello from Rails!" }, status: :ok
    end

    private
    
    def render_not_found_response(error)
        render json: { errors: "#{error.model} not found."}, status: :not_found
    end

    def render_unprocessable_entity_response(error)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_connection_not_established_response(error)
        render json: { errors: error}, status: :service_unavailable
    end
end
