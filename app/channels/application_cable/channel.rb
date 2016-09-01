module ApplicationCable
  class Channel < ActionCable::Channel::Base
    before_subscribe :authenticate_request

    private
      def authenticate_request
        puts params
        headers = {'Authorization' => params["id_token"]}
        @current_user = AuthorizeApiRequest.call(headers).result
      end
  end
end
