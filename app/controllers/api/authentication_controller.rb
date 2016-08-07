class Api::AuthenticationController < ApplicationController
  skip_before_action :authenticate_request, except: [:confirm]

  # Authenticates user and returns JWT
  def authenticate
    params = user_params
    command = AuthenticateUser.call(params[:email], params[:password])

    if command.success?
      render json: { auth_token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end

  # Registers user and returns error or authenticates
  def register
    @user = User.new(user_params)

    if @user.save
      authenticate
    else
      render json: { error: @user.errors }, status: :conflict
    end
  end

  # Confirms that JWT is valid by returning current user
  def confirm
    render json: @current_user.to_json
  end

  private
    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:authentication).require(:email);
      params.require(:authentication).require(:password);
      params.require(:authentication).to_unsafe_h
    end
end