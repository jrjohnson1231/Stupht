# require 'rails_helper'

# RSpec.describe Api::V1::PostsController, :type => :controller do

#   # This should return the minimal set of attributes required to create a valid
#   # Post. As you add validations to Post, be sure to
#   # adjust the attributes here as well.
#   let(:valid_attributes) {
#     FactoryGirl.build(:post).as_json
#   }

#   let(:invalid_attributes) {
#     {body: nil, title: nil, user_id: 'String'}
#   }

#   let(:new_attributes) {
#     FactoryGirl.build(:post, body: "New Post").as_json
#   }

#   # This should return the minimal set of values that should be in the session
#   # in order to pass any filters (e.g. authentication) defined in
#   # PostsController. Be sure to keep this updated too.
#   let(:valid_session) { {} }

#   describe "GET index" do
#     it "assigns all posts as @posts" do
#       post = FactoryGirl.create(:post)
#       get :index, params: {}, session: valid_session
#       expect(assigns(:posts).to_a).to eq([post])
#     end
#   end

#   describe "GET show" do
#     it "assigns the requested post as @post" do
#       post = FactoryGirl.create(:post)
#       get :show, params: {:id => post.id}, session: valid_session
#       expect(assigns(:post)).to eq(post)
#     end
#   end

#   describe "PATCH update" do
#     it "assigns the requested post as @post" do
#       post = FactoryGirl.create(:post)
#       patch :update, params: {:id => post.id, :post => new_attributes}, session: valid_session
#       expect(assigns(:post)).to eq(post)
#     end
#   end

#   describe "POST create" do
#     describe "with valid params" do
#       it "creates a new Post" do
#         expect {
#           post :create, params: {:post => valid_attributes}, session: valid_session
#         }.to change(Post, :count).by(1)
#       end

#       it "assigns a newly created post as @post" do
#         post :create, params: {:post => valid_attributes}, session: valid_session
#         expect(assigns(:post)).to be_a(Post)
#         expect(assigns(:post)).to be_persisted
#       end
#     end

#     describe "with invalid params" do
#       it "assigns a newly created but unsaved post as @post" do
#         post :create, params: {:post => invalid_attributes}, session: valid_session
#         expect(assigns(:post)).to be_a_new(Post)
#       end
#     end
#   end

#   describe "PUT update" do
#     describe "with valid params" do
#       it "updates the requested post" do
#         post = Post.create! valid_attributes
#         put :update, params: {:id => post.id, :post => new_attributes}, session: valid_session
#         expect(assigns(:post)).to eq(post)
#       end

#       it "assigns the requested post as @post" do
#         post = Post.create! valid_attributes
#         put :update, params: {:id => post.id, :post => valid_attributes}, session: valid_session
#         expect(assigns(:post)).to eq(post)
#       end
#     end

#     describe "with invalid params" do
#       it "assigns the post as @post" do
#         post = Post.create! valid_attributes
#         put :update, params: {:id => post.id, :post => invalid_attributes}, session: valid_session
#         expect(assigns(:post)).to eq(post)
#       end
#     end
#   end

#   describe "DELETE destroy" do
#     it "destroys the requested post" do
#       post = Post.create! valid_attributes
#       expect {
#         delete :destroy, params: {:id => post.id}, session: valid_session
#       }.to change(Post, :count).by(-1)
#     end
#   end

# end
