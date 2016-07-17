FactoryGirl.define do
  factory :post do
    title 'Hello'
    body 'World'
    user
  end
end
