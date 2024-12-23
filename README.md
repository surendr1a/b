# Parent Class for common properties and methods
class Person
  attr_accessor :first_name, :last_name, :address, :city, :date_of_birth, :role, :balance

  def initialize(first_name:, last_name:, address:, city:, date_of_birth:, role:, balance:)
    @first_name = first_name
    @last_name = last_name
    @address = address
    @city = city
    @date_of_birth = date_of_birth
    @role = role
    @balance = balance
  end

  def formatted_price
    "INR #{@balance}"
  end
end

# Customer Class
class Customer < Person
  def full_address
    "#{@address}, #{@city}"
  end

  # Class method to filter customers from data
  def self.all_customers(data)
    data.select { |person| person[:role] == 'buyer' }.map do |cust|
      new(first_name: cust[:first_name], last_name: cust[:last_name], address: cust[:address],
          city: cust[:city], date_of_birth: cust[:date_of_birth], role: cust[:role], balance: cust[:balance])
    end
  end

  def self.filter_by_city(data, city)
    all_customers(data).select { |customer| customer.city.downcase == city.downcase }
  end

  def self.filter_by_address(data, address_like)
    all_customers(data).select { |customer| customer.address.downcase.include?(address_like.downcase) }
  end
end

# Seller Class
class Seller < Person
  attr_accessor :selling_product

  def initialize(first_name:, last_name:, address:, city:, date_of_birth:, role:, balance:, selling_product:)
    super(first_name: first_name, last_name: last_name, address: address, city: city, date_of_birth: date_of_birth,
          role: role, balance: balance)
    @selling_product = selling_product
  end

  def full_address
    "#{@address}, #{@city}"
  end

  # Class method to filter sellers from data
  def self.all_sellers(data)
    data.select { |person| person[:role] == 'seller' }.map do |sell|
      new(first_name: sell[:first_name], last_name: sell[:last_name], address: sell[:address],
          city: sell[:city], date_of_birth: sell[:date_of_birth], role: sell[:role], balance: sell[:balance],
          selling_product: sell[:selling_product])
    end
  end

  def self.seller_of_product(data, product_name)
    all_sellers(data).select { |seller| seller.selling_product.downcase == product_name.downcase }
  end
end

# Raw data
data = [
  { id: 1, first_name: 'alex', last_name: 'Newman', date_of_birth: '01-05-1982', house_no: 25,
    city: 'bhopal', address: 'ram nagar', role: 'buyer', balance: 100 },
  { id: 2, first_name: 'alex', last_name: 'Panc', date_of_birth: '12-04-1990', house_no: 12,
    city: 'gwalior', address: 'kampu', role: 'seller', selling_product: 'toycar', balance: 140 },
  { id: 3, first_name: 'Meena', last_name: 'Pallanipppan', date_of_birth: '03-02-1988', house_no: 17,
    city: 'indore', address: 'sapna sangeeta', role: 'seller', selling_product: 'dress', balance: 750 },
  { id: 4, first_name: 'Prabhu', last_name: 'Sharma', date_of_birth: '11-02-1992', house_no: 25,
    city: 'indore', address: 'geeta bhawan', role: 'seller', selling_product: 'electronics', balance: 220 },
  { id: 5, first_name: 'Sundar', last_name: 'Pichai', date_of_birth: '11-05-1983', house_no: 10,
    city: 'indore', address: 'scheme 78 vijay nagar', role: 'buyer', balance: 350 }
]

# Example Outputs
puts "All Customers:"
customers = Customer.all_customers(data)
customers.each { |cust| puts "#{cust.first_name} #{cust.last_name}" }

puts "\nFull Address of Sundar:"
sundar = customers.find { |cust| cust.first_name == 'Sundar' }
puts sundar.full_address

puts "\nCustomers from Gwalior:"
gwalior_customers = Customer.filter_by_city(data, 'gwalior')
gwalior_customers.each { |cust| puts "#{cust.first_name} #{cust.last_name}" }

puts "\nCustomers with address like 'indore':"
indore_customers = Customer.filter_by_address(data, 'indore')
indore_customers.each { |cust| puts "#{cust.first_name} #{cust.last_name}" }

puts "\nFormatted Balance of Sundar:"
puts sundar.formatted_price

puts "\nAll Sellers:"
sellers = Seller.all_sellers(data)
sellers.each { |seller| puts "#{seller.first_name} #{seller.last_name}" }

puts "\nFull Address of Prabhu:"
prabhu = sellers.find { |seller| seller.first_name == 'Prabhu' }
puts prabhu.full_address

puts "\nSellers of Product 'dress':"
dress_sellers = Seller.seller_of_product(data, 'dress')
dress_sellers.each { |seller| puts "#{seller.first_name} #{seller.last_name}" }