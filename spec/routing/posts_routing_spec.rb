require "rails_helper"

RSpec.describe Api::V1::PostsController, :type => :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/api/v1/users/123/posts").to route_to("api/v1/posts#index", :user_id => "123")
    end

    it "routes to #show" do
      expect(:get => "/api/v1/users/123/posts/1").to route_to("api/v1/posts#show", :id => "1", :user_id => "123")
    end

    it "routes to #create" do
      expect(:post => "/api/v1/users/123/posts").to route_to("api/v1/posts#create", :user_id => "123")
    end

    it "routes to #update" do
      expect(:put => "/api/v1/users/123/posts/1").to route_to("api/v1/posts#update", :id => "1", :user_id => "123")
      expect(:patch => "/api/v1/users/123/posts/1").to route_to("api/v1/posts#update", :id => "1", :user_id => "123")
    end

    it "routes to #destroy" do
      expect(:delete => "/api/v1/users/123/posts/1").to route_to("api/v1/posts#destroy", :id => "1", :user_id => "123")
    end

  end
end
