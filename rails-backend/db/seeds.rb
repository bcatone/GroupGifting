<<<<<<< HEAD
# require 'faker'


# User.create!(
#   email: "user1@example.com",
#   password_digest: BCrypt::Password.create("password123"),
#   username: "user1",
#   first_name: "John",
#   last_name: "Doe",
#   city: "New York",
#   state: "NY",
#   zip: "10001"
# )

# User.create!(
#   email: "user2@example.com",
#   password_digest: BCrypt::Password.create("password456"),
#   username: "user2",
#   first_name: "Jane",
#   last_name: "Smith",
#   city: "Los Angeles",
#   state: "CA",
#   zip: "90001"
# )

# User.create!(
#   email: "user3@example.com",
#   password_digest: BCrypt::Password.create("password789"),
#   username: "user3",
#   first_name: "Alice",
#   last_name: "Johnson",
#   city: "Chicago",
#   state: "IL",
#   zip: "60601"
# )


# # Define categories for items
# categories = [
#   "Clothing",
#   "Electronics",
#   "Furniture",
#   "Toys & Games",
#   "Books & Media",
#   "Sports Equipment",
#   "Tools & Hardware",
#   "Decoration",
#   "Pet Supplies",
#   "Toiletries",
#   "Art & Craft Supplies",
#   "Garden & Outdoor",
#   "Medical Supplies",
#   "Baby & Childcare",
#   "Musical Instruments",
#   "Office Supplies",
#   "Appliances",
#   "Miscellaneous Items"
# ]

# # Generate 10 random items
# 10.times do
#   Item.create!(
#     title: Faker::Commerce.product_name,
#     description: Faker::Lorem.paragraph(sentence_count: 3),
#     category: categories.sample,
#     location: rand(10000..99999),
#     user_id:1,
#     status: ["Available", "Claimed", "Inactive", "Unavailible"].sample,
#     recipient_id: rand(2..3),
#     suggested_donation_amount: rand(5..50),
#     is_public: [true, false].sample,
#     deadline: Faker::Time.between_dates(from: Date.today, to: Date.today + 30, period: :day)
#   )
# end

# puts "Seed data has been generated successfully!"

# (1..10).each do |item_id|
#   item = Item.find(item_id)
#   (1..4).each do |image_number|
#     filename = "image#{image_number}.jpg"
#     item.images.attach(io: File.open("../react-frontend/src/components/App/images/#{filename}"), filename: filename)
#   end
# end


# item.images.attach(io: File.open("../react-frontend/src/components/App/images/#{filename}"), filename: filename)

# # Find the item by its ID
# item1 = Item.find_by(id: 1)

# # Ensure the item exists
# if item1.present?
#   # Attach the image
#   image_attachment = item1.images.attach(io: File.open("../react-frontend/src/components/App/images/plate.jpg"), filename: "plate.jpg")
  
#   # Ensure attachment was successful
#   if image_attachment.present?
#     # Prepend the attached image to the beginning of the images array
#     item1.images.unshift(image_attachment.first)
#   else
#     puts "Failed to attach image"
#   end
# else
#   puts "Item not found"
# end



# categories = [
#   "Clothing",
#   "Electronics",
#   "Furniture",
#   "Toys & Games",
#   "Books & Media",
#   "Sports Equipment",
#   "Tools & Hardware",
#   "Decoration",
#   "Pet Supplies",
#   "Toiletries",
#   "Art & Craft Supplies",
#   "Garden & Outdoor",
#   "Medical Supplies",
#   "Baby & Childcare",
#   "Musical Instruments",
#   "Office Supplies",
#   "Appliances",
#   "Miscellaneous Items"
# ]

# # Generate 10 random items
# 30.times do
#   Item.create!(
#     title: Faker::Commerce.product_name,
#     description: Faker::Lorem.paragraph(sentence_count: 5),
#     category: categories.sample,
#     location: [98345, 98311, 98310, 98119, 98199, 98109, 98121, 98101, 98122, 98174, 98104, 98100].sample,
#     user_id:2,
#     status: "Availible",
#     recipient_id: nil,
#     suggested_donation_amount: rand(5..50),
#     is_public: true,
#     deadline: Faker::Time.between_dates(from: Date.today, to: Date.today + 30, period: :day)
#   )
# end

ZIP_CODE_CITIES = {
  98345 => "Port Ludlow",
  98311 => "Bremerton",
  98310 => "Bremerton",
  98119 => "Seattle",
  98199 => "Seattle",
  98109 => "Seattle",
  98121 => "Seattle",
  98101 => "Seattle",
  98122 => "Seattle",
  98174 => "Seattle",
  98104 => "Seattle",
  98100 => "Seattle",
  98110 => "Bainbridge Island"
  # Add more zip codes and corresponding cities as needed
}

Item.all.each do |item|
    zip_code = item.zip.to_i
    if ZIP_CODE_CITIES.key?(zip_code)
      item.update(city: ZIP_CODE_CITIES[zip_code])
item.save!
    else
      # Handle the case where the zip code is not found in the mapping
      puts "City not found for zip code: #{zip_code}"
    end

  end






=======
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# puts "Seeding data..."

# puts "Seeding users..."

# user_data = [
#     {
#         email: "example@example.com",
#         password: "password",
#         username: "TestUser1",
#         first_name: "Tessie",
#         last_name: "Uzer",
#         zip: "10036"
#     },
#     {
#         email: "ayeayecaptain@example.com",
#         password: "password",
#         username: "PatchyThePirate",
#         first_name: "Patchy",
#         last_name: "DePirate",
#         zip: "91505"
#     },
#     {
#         email: "rainbowsandunicorns@example.com",
#         password: "password",
#         username: "Mr. Sparkles",
#         first_name: "Frank",
#         last_name: "Sparkles",
#         zip: "34470"
#     },
#     {
#         email: "fuzzywuzzypuppyface@example.com",
#         password: "password",
#         username: "Fido J. McFuzzypants",
#         first_name: "Fido",
#         last_name: "McFuzzypants",
#         zip: "33328"
#     }
# ]

# user_data.each do |user_datum|
#     user = User.find_by(email: user_datum[:email])

#     if user
#         puts "User #{user.email} already exists with id: #{user.id}"
#     else
#         user = User.create!(user_datum)
#         puts "Created new user with id: #{user.id}"
#     end
# end

# puts "Finished seeding users!"

# puts "Forming test friendships and messages..."

# user_1 = User.first
# users = User.all

# users.each do |user|
    
#     next if user == user_1

#     friendship_connection = FriendshipConnection.find_or_create_by!(sender_id: user_1.id, receiver_id: user.id, status: "accepted")

#     random_number = rand(1..2)

#     user_a = random_number % 2 == 0 ? user_1 : user
#     puts "user_a: #{user_a.id}"
#     user_b = random_number % 2 == 0 ? user : user_1
#     puts "user_b: #{user_b.id}"

#     DirectMessage.create!(sender_id: user_a.id, receiver_id: user_b.id, content: "Hello, world! Wait... I mean hello #{user_b.first_name}", type: "DirectMessage")
#     DirectMessage.create!(sender_id: user_b.id, receiver_id: user_a.id, content: "Hi, #{user_a.first_name}!", type: "DirectMessage")
# end

# Message.all.each do |message|
#     MessageView.find_or_create_by!(user: message.sender, message: message)
# end

# DirectMessage.all.each do |message|
#     MessageView.find_or_create_by!(user: message.receiver, message: message)
# end
>>>>>>> dev
