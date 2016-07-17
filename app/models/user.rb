class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :name, type: String
  field :email, type: String
  field :password_digest, type: String
  has_secure_password

  has_many :posts

  def serializable_hash(options={})
    hash = super(options)
    hash[:posts] = posts.inject([]) { |all, post| all << post.serializable_hash }
    hash
  end  
end
