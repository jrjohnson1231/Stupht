module AuthorizationHelper
  def set_auth_header(auth_token)
    @request.headers['Authorization'] = auth_token
  end
end