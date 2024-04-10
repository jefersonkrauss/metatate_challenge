class Api::V1::UserController < ApplicationController
  before_action :authenticate_user!

  def logged_user
    render :json => Http::ApiResponse.success(data: UserSerializer.new(current_user).attributes), status: :ok
  end

end
