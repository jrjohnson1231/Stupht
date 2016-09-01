# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class PostChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "'#{params[:email]}_feed'"
    stream_from "'main_feed'"
    ActionCable.server.broadcast(
      "'main_feed'",
      "#{params[:email]} is listening"
    )
  end

  def receive(data)
    puts params, data
  end
end
