require 'faker'

# Define categories for items
categories = [
  "Clothing",
  "Electronics",
  "Furniture",
  "Toys & Games",
  "Books & Media",
  "Sports Equipment",
  "Tools & Hardware",
  "Decoration",
  "Pet Supplies",
  "Hygiene Products",
  "Art & Craft Supplies",
  "Garden & Outdoor",
  "Medical Supplies",
  "Baby & Childcare",
  "Musical Instruments",
  "Office Supplies",
  "Appliances",
  "Miscellaneous Items"
]

# Generate 10 random items
10.times do
  Item.create!(
    title: Faker::Commerce.product_name,
    description: Faker::Lorem.paragraph(sentence_count: 3),
    category: categories.sample,
    location: rand(10000..99999),
    user_id:1,
    status: ["Available", "Claimed", "Inactive", "Unavailible"].sample,
    recipient_id: rand(2..3),
    suggested_donation_amount: rand(5..50),
    is_public: [true, false].sample,
    deadline: Faker::Time.between_dates(from: Date.today, to: Date.today + 30, period: :day)
  )
end

puts "Seed data has been generated successfully!"
