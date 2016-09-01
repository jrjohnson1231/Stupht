module ApplicationCable
  class Channel < ActionCable::Channel::Base
    before_subscribe :authenticate_request

    private
      def authenticate_request
        puts params
        # @current_user = AuthorizeApiRequest.call(request.headers).result

        # render json: { error: 'Not Authorized' }, status: 401 unless @current_user
      end
  end
end
