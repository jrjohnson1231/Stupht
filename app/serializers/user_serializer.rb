class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :posts
end
