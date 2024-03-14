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






