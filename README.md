class User
  attr_accessor :name, :address, :balance, :account_number

  def initialize(name, address, account_number, balance = 0)
    @name = name
    @address = address
    @balance = balance
    @account_number = account_number
  end
end

class BankingOperation
  @@accounts = {}

  def self.create_account
    puts "Enter your name:"
    name = gets.chomp
    puts "Enter your address:"
    address = gets.chomp
    account_number = rand(1000..9999)
    user = User.new(name, address, account_number)
    @@accounts[account_number] = user
    puts "Account created successfully! Your account number is #{account_number}"
  end

  def self.credit_amount
    puts "Enter your account number:"
    account_number = gets.chomp.to_i
    if @@accounts.key?(account_number)
      puts "Enter the amount to credit:"
      amount = gets.chomp.to_f
      @@accounts[account_number].balance += amount
      puts "Amount credited successfully! Current balance: #{@@accounts[account_number].balance}"
    else
      puts "Account not found!"
    end
  end

  def self.debit_amount
    puts "Enter your account number:"
    account_number = gets.chomp.to_i
    if @@accounts.key?(account_number)
      puts "Enter the amount to debit:"
      amount = gets.chomp.to_f
      if @@accounts[account_number].balance >= amount
        @@accounts[account_number].balance -= amount
        puts "Amount debited successfully! Current balance: #{@@accounts[account_number].balance}"
      else
        puts "Insufficient balance!"
      end
    else
      puts "Account not found!"
    end
  end

  def self.show_account_info
    puts "Enter your account number:"
    account_number = gets.chomp.to_i
    if @@accounts.key?(account_number)
      user = @@accounts[account_number]
      puts "Account Details:"
      puts "Name: #{user.name}"
      puts "Address: #{user.address}"
      puts "Balance: #{user.balance}"
      puts "Account Number: #{user.account_number}"
    else
      puts "Account not found!"
    end
  end

  def self.delete_account
    puts "Enter your account number:"
    account_number = gets.chomp.to_i
    if @@accounts.key?(account_number)
      puts "Are you sure you want to delete your account? (yes/no)"
      confirmation = gets.chomp.downcase
      if confirmation == "yes"
        @@accounts.delete(account_number)
        puts "Account deleted successfully!"
      else
        puts "Account deletion cancelled."
      end
    else
      puts "Account not found!"
    end
  end
end

def main
  loop do
    puts "\nChoose an operation:"
    puts "1. Open a new account"
    puts "2. Credit amount"
    puts "3. Debit amount"
    puts "4. Account info"
    puts "5. Delete account"
    puts "6. Exit"
    choice = gets.chomp.to_i

    case choice
    when 1
      BankingOperation.create_account
    when 2
      BankingOperation.credit_amount
    when 3
      BankingOperation.debit_amount
    when 4
      BankingOperation.show_account_info
    when 5
      BankingOperation.delete_account
    when 6
      puts "Exiting the program. Thank you!"
      break
    else
      puts "Invalid option. Please try again."
    end
  end
end

main