module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      # self.current_user = User.first.serializable_hash[:email]
    end
  end
end
