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