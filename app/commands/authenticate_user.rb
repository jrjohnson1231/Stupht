class AuthenticateUser
  prepend SimpleCommand

  def initialize(email, password)
    @email = email
    @password = password
  end

  def call
    token_attributes = user.serializable_hash.slice("name", "email", "id") if user
    JsonWebToken.encode(token_attributes) if user
  end


  private

  attr_accessor :email, :password

  def user
    @user = User.find_by(email: email)
    return @user if @user && @user.authenticate(password)

    @user ? errors.add(:password, 'The password given is incorrect') : errors.add(:email, 'The email given is incorrect')
    nil
  end
end
