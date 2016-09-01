# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class PostChannel < ApplicationCable::Channel
  def subscribed
    stream_from "'#{params[:email]}_feed'"
    ActionCable.server.broadcast(
      "'#{params[:email]}_feed'",
      "#{params[:email]} is listening"
    )
  end

  def receive(data)
    puts params, data
  end
end
