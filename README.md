Here’s a solution for the given assignments, focusing on clean code, DRY principles, and leveraging Ruby concepts.


---

Entities and Relationships

1. Entities:

Customer: Represents buyers in the shop. Properties: id, first_name, last_name, address, city, date_of_birth, type, balance.

Seller: Represents sellers in the shop. Properties: id, first_name, last_name, address, city, date_of_birth, selling_product, balance.

Product: Represents items sold in the shop. Properties: name, price, quantity, category, discount.



2. Relationships:

A Customer can add/remove products in their Shopping Cart.

A Seller provides Products to the shop.

Products can be filtered by name, category, or price range.





---

Base Class for Common Properties

class Person
  attr_accessor :id, :first_name, :last_name, :date_of_birth, :address, :city, :balance

  def initialize(id:, first_name:, last_name:, date_of_birth:, address:, city:, balance:)
    @id = id
    @first_name = first_name
    @last_name = last_name
    @date_of_birth = date_of_birth
    @address = address
    @city = city
    @balance = balance
  end

  def full_name
    "#{@first_name} #{@last_name}"
  end

  def formatted_address
    "#{@address[:house_no]}, #{@address[:street]}, #{@address[:area]}, #{@city}"
  end

  def formatted_balance
    "INR #{@balance}"
  end
end


---

Customer Class

class Customer < Person
  attr_accessor :type

  def initialize(id:, first_name:, last_name:, date_of_birth:, address:, city:, balance:, type:)
    super(id: id, first_name: first_name, last_name: last_name, date_of_birth: date_of_birth, address: address, city: city, balance: balance)
    @type = type
  end

  def self.all_customers(data)
    data.select { |d| d[:role] == 'buyer' }.map do |customer_data|
      Customer.new(
        id: customer_data[:id],
        first_name: customer_data[:first_name],
        last_name: customer_data[:last_name],
        date_of_birth: customer_data[:date_of_birth],
        address: customer_data[:address],
        city: customer_data[:city],
        balance: customer_data[:balance],
        type: 'buyer'
      )
    end
  end

  def self.filter_by_city(data, city)
    all_customers(data).select { |customer| customer.city.downcase == city.downcase }
  end

  def self.filter_by_address(data, address_like)
    all_customers(data).select { |customer| customer.address.values.join.downcase.include?(address_like.downcase) }
  end
end


---

Seller Class

class Seller < Person
  attr_accessor :selling_product

  def initialize(id:, first_name:, last_name:, date_of_birth:, address:, city:, balance:, selling_product:)
    super(id: id, first_name: first_name, last_name: last_name, date_of_birth: date_of_birth, address: address, city: city, balance: balance)
    @selling_product = selling_product
  end

  def self.all_sellers(data)
    data.select { |d| d[:role] == 'seller' }.map do |seller_data|
      Seller.new(
        id: seller_data[:id],
        first_name: seller_data[:first_name],
        last_name: seller_data[:last_name],
        date_of_birth: seller_data[:date_of_birth],
        address: seller_data[:address],
        city: seller_data[:city],
        balance: seller_data[:balance],
        selling_product: seller_data[:selling_product]
      )
    end
  end

  def self.seller_of_product(data, product_name)
    all_sellers(data).select { |seller| seller.selling_product.downcase == product_name.downcase }
  end
end


---

Raw Data

data = [
  { id: 1, first_name: 'Alex', last_name: 'Newman', date_of_birth: '01-05-1982', address: { house_no: '25', street: 'ram nagar', area: 'bhopal' }, city: 'bhopal', role: 'buyer', balance: 100 },
  { id: 2, first_name: 'Alex', last_name: 'Panc', date_of_birth: '12-04-1990', address: { house_no: '12', street: 'kampu', area: 'gwalior' }, city: 'gwalior', role: 'seller', selling_product: 'toycar', balance: 140 },
  { id: 3, first_name: 'Meena', last_name: 'Pallanipppan', date_of_birth: '03-02-1988', address: { house_no: '17', street: 'sapna sangeeta', area: 'indore' }, city: 'indore', role: 'seller', selling_product: 'dress', balance: 750 },
  { id: 4, first_name: 'Prabhu', last_name: 'Sharma', date_of_birth: '11-02-1992', address: { house_no: '25', street: 'geeta bhawan', area: 'indore' }, city: 'indore', role: 'seller', selling_product: 'electronics', balance: 220 },
  { id: 5, first_name: 'Sundar', last_name: 'Pichai', date_of_birth: '11-05-1983', address: { house_no: '10', street: 'scheme 78', area: 'vijay nagar' }, city: 'indore', role: 'buyer', balance: 350 }
]


---

Usage

1. List all customers:

customers = Customer.all_customers(data)


2. Get formatted address:

sundar = customers.find { |c| c.first_name == 'Sundar' }
sundar.formatted_address


3. Filter customers by city:

customers_in_gwalior = Customer.filter_by_city(data, 'gwalior')


4. Filter customers by address:

customers_in_indore = Customer.filter_by_address(data, 'indore')


5. Get seller of a product:

sellers_of_dress = Seller.seller_of_product(data, 'dress')



This approach ensures code clarity, modularity, and extensibility while demonstrating the required Ruby concepts.

