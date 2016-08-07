require 'rails_helper'

RSpec.describe Api::AuthenticationController, :type => :routing do
  describe "routing" do

    it "routes to #confirm" do
      expect(:get => "/api/confirm").to route_to("api/authentication#confirm")
    end

    it "routes to #authenticate" do
      expect(:post => "/api/authenticate").to route_to("api/authentication#authenticate")
    end

    it "routes to #register" do
      expect(:post => "/api/register").to route_to("api/authentication#register")
    end

  end
end