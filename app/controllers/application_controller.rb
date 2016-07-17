class ApplicationController < ActionController::API
  include ActionController::Serialization
  before_action :authenticate_request
  attr_reader :current_user


  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    puts 'current user'
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user || true
  end
end
