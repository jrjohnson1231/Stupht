class ApplicationController < ActionController::API
  include ActionView::Layouts
  before_action :authenticate_request
  skip_before_action :authenticate_request, only: [:angular]

  attr_reader :current_user

  def angular
    puts 'rendering angular'
    render file: "#{Rails.root}/public/index.html"
  end

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result

    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
