require 'rails_helper'

RSpec.describe 'Authentication', :type => :request do
  describe 'POST register' do
    it 'Makes new user with proper attributes' do
      user = FactoryGirl.attributes_for(:user)
      post api_register_path, params: {:authentication => user}
    end

    it 'Registers new user and returns auth token' do
      user = FactoryGirl.attributes_for(:user)
      post api_register_path, params: {:authentication => user}

      expect(response).to be_success
      expect(response.status).to eq(200);

      body = JSON.parse(response.body)

      expect(body['error']).to be_falsy
    end

    it 'Does not register user twice' do
      # Register user once
      user = FactoryGirl.attributes_for(:user)
      post api_register_path, params: {:authentication => user}

      # Register user second time
      post api_register_path, params: {:authentication => user}

      expect(response).to_not be_success
      expect(response.status).to eq(409);

      body = JSON.parse(response.body)
      
      expect(body['error']).to be_truthy
    end

    it 'Requires email field' do
      user = {password: 'password'}.as_json

      expect{ post api_register_path, params: {:authentication => user} }.to raise_error ActionController::ParameterMissing
    end

    it 'Requires password field' do
      user = {email: 'example@mail.com'}.as_json

      expect{ post api_register_path, params: {:authentication => user} }.to raise_error ActionController::ParameterMissing
    end
  end

  describe 'POST authenticate' do
    it 'Requires email field' do
      user = {password: 'password'}.as_json

      expect{ post api_authenticate_path, params: {:authentication => user} }.to raise_error ActionController::ParameterMissing
    end

    it 'Requires password field' do
      user = {email: 'example@mail.com'}.as_json

      expect{ post api_authenticate_path, params: {:authentication => user} }.to raise_error ActionController::ParameterMissing
    end

    it 'Sends back auth token for valid user' do
      user = FactoryGirl.create(:user)
      user_attributes = FactoryGirl.attributes_for(:user)
      post api_authenticate_path, params: {:authentication => user_attributes}

      expect(response).to be_success
      expect(response.status).to eq(200);

      body = JSON.parse(response.body)

      expect(body['auth_token']).to be_truthy
      expect(body['error']).to be_falsy
    end

    it 'Returns error for invalid user' do
      user = FactoryGirl.attributes_for(:user)
      post api_authenticate_path, params: {:authentication => user}

      expect(response).to_not be_success
      expect(response.status).to eq(401);

      body = JSON.parse(response.body)

      expect(body['auth_token']).to be_falsy
      expect(body['error']).to be_truthy
    end

    it 'Confirms auth token is good' do
      user = FactoryGirl.create(:user)
      user_attributes = FactoryGirl.attributes_for(:user)
      post api_authenticate_path, params: {:authentication => user_attributes}

      auth_token = JSON.parse(response.body)['auth_token']

      get api_confirm_path, headers: {'Authorization': auth_token}

      body = JSON.parse(response.body)
      expect(body['email']).to eq(user[:email])
    end
  end
end