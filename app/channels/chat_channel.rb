# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "'#{params[:email]}_feed'"
    stream_from "'main_feed'"
    ActionCable.server.broadcast(
      "'main_feed'",
      {
        user: "Channel",
        message: "#{params[:email]} is listening"
      }
    )
  end

  def receive(data)
    ActionCable.server.broadcast(
      "'main_feed'",
      {
        user: params[:email],
        message: data["message"]
      }
      )
  end
end
