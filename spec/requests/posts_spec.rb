require 'rails_helper'

RSpec.describe "Posts", :type => :request do
  describe "GET /posts" do
    it "works! (now write some real specs)" do
      get api_v1_user_posts_path('123')
    end
  end
end
