#! /usr/bin/env node 
import inquirer from "inquirer"; // this . current obj ko represent ata hy
;
// bank aacount class                        // y ooper waly sary tsks k ham implement karyny y emplement ka keyword ts ko infrm karta k jitny bi interface k andar jo requirements hyn saari y class follow karrrahi
class BankAccount {
    accountNumber;
    balance;
    // cnstaractor aik methoud hy jo cass k object ko initialize karta 
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    } // this keyword current obj ko reffare karta hy agar ham this constaracot mn use karyny to y class k object ko represent karta hy iski help sy ham class k methouds or properties ko acccess karsakty hyn
    //DEBIT MONEY .....WITHDRAW
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdarawal of ${amount} sucessfull . your Remaining Balance : ${this.balance}`);
        }
        else {
            console.log("Insufficient Balance.");
        }
    }
    // CREDIT MONEY 
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // agar 100 dollar sy zada deposit karwayga to 1 $ fee k tor par chareg hoaga
        }
        this.balance += amount; //yaani ab wo aamount add kRDO jo 1 $ - hony  bad bachi hy
        console.log(`Deposit of $ ${amount} successful. Remaining Balance: $${this.balance}`);
    }
    // CHECK THE BALANCE 
    checkBalance() {
        console.log(`Current Balance: $${this.balance}`);
    }
    ;
}
;
// COSTOMER CLASS
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// create bank accounts 
const accounts = [
    new BankAccount(1100, 5000),
    new BankAccount(1200, 10000),
    new BankAccount(1300, 15000)
];
//  CREAT CUSTOMERS
const customers = [
    new Customer("Fiza", "Nazz", "Female", 19, 3148886665, accounts[0]),
    new Customer("Ayesha", "cute", "Female", 14, 3148335590, accounts[1]),
    new Customer("Abu", "Bakar", "male", 10, 3148553219, accounts[2])
];
// FUNCTION TO INTERACT WITH BANK AACOUNT
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter Your Account Number"
        });
        const Customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (Customer) {
            console.log(`Wellcome ${Customer.firstName} ${Customer.lastName}!/n`);
            const ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposite", "Withdraw", "check Balance", "Exit"]
                }
            ]);
            switch (ans.select) {
                case "Deposite":
                    const depositeAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter The Amount To Deposit"
                    });
                    Customer.account.deposit(depositeAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter The Amount To withdraw"
                    });
                    Customer.account.deposit(withdrawAmount.amount);
                    break;
                case "check Balance":
                    Customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program....!");
                    console.log("/n Thank You For Using Our Bank Services. Have a Good Day!");
                    return;
            }
        }
        else {
            console.log("Invalid Account Number.. Please Try Again.");
        }
    } while (true);
}
service();
