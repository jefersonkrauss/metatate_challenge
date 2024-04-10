class ApplicationController < ActionController::API

  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from ActiveRecord::RecordInvalid do |e|
    render json: Http::ApiResponse.error(message: e.record.errors), status: :bad_request
  end

  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: Http::ApiResponse.error(message: e.message), status: :not_found
  end

  rescue_from ActionController::ParameterMissing do |e|
    Rails.logger.error(e)
    render json: { message: e.message }, status: :bad_request
  end

  rescue_from NotFoundError do |e|
    Rails.logger.error(e)
    render json: { message: e.message }, status: :not_found
  end

  rescue_from BusinessError do |e|
    Rails.logger.error(e)
    render json: Http::ApiResponse.error(message: e.message), status: :ok
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[name avatar])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[name avatar])
  end

  def user
    current_user
  end

end
