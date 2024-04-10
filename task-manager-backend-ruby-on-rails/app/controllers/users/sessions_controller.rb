# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionsFix
  respond_to :json

  # UserSerializer.new(#user).serializable_hash[:data][:attributes]

  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  private

  def respond_with(current_user, _opts = {})
    if current_user.valid?
      data = { user: UserSerializer.new(current_user).attributes }
      render json: Http::ApiResponse.success(data: data, message: 'Logged in successfully.'), status: :ok
    else
      render json: Http::ApiResponse.error(message: "User not found!."), status: :unauthorized
    end
  end

  def respond_to_on_destroy

    current_user = nil

    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.dig(Rails.env, :devise_jwt_secret_key)).first
      current_user = User.find(jwt_payload['sub'])
    end

    if current_user
      render json: Http::ApiResponse.success(message: 'Logged out successfully.'), status: :ok
    else
      render json: Http::ApiResponse.error(message: "Couldn't find an active session."), status: :unauthorized
    end
  rescue JWT::ExpiredSignature => e
    Rails.logger.error(e)
    render json: Http::ApiResponse.success(message: 'Logged out successfully.'), status: :ok
  end
end
