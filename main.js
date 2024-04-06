#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let userld = "";
const userPin = 2006;
let current_balance = 500000;
//  asking username:
const userName_ans = await inquirer.prompt({
    name: "usr_name",
    type: "input",
    message: chalk.yellow("\nWhat is your good name !"),
});
if (userName_ans.usr_name !== undefined &&
    userName_ans.usr_name !== null &&
    userName_ans.usr_name !== "") {
    userld = userName_ans.usr_name;
}
// main function:
async function atm_func() {
    console.log(chalk.yellow.bold("\n\tWELCOME TO ATM!\n"));
    const pin_ans = await inquirer.prompt({
        name: "pin",
        type: "number",
        message: chalk.red("Entre your 4 digit pin code."),
    });
    if (pin_ans.pin === userPin) {
        console.log(chalk.green.bold(`\n\t Hello ${userld},welcome to the ATM.\n`));
        console.log(chalk.hex("FFA500")(`Your current balance is:${current_balance}\n`));
        let anotherTransaction = true;
        while (anotherTransaction) {
            const choices = await inquirer.prompt([
                {
                    type: "list",
                    name: "options",
                    message: chalk.red.bold("Please select an option:"),
                    choices: [
                        "Deposite Amount",
                        "Cash Withdraw",
                        "Balance Check",
                        "Fast Cash",
                    ],
                },
            ]);
            //  deposit amount:
            if (choices.options === "Deposite Amount") {
                const Deposite_ans = await inquirer.prompt({
                    name: "deposite_amount",
                    type: "number",
                    message: chalk.red("Entre your amount to deposite:"),
                });
                if (Deposite_ans.deposite_amount > 0) {
                    current_balance = current_balance + Deposite_ans.deposite_amount;
                    console.log(chalk.hex("#FFA500")(`\n Your Current Balance is: $${current_balance}\n`));
                }
                else {
                    console.log(chalk.red.bold(`\n\t You entered invalid amount.`));
                }
            }
            // cash withdraw:
            else if (choices.options === "Cash Withdraw") {
                const withdraw_ans = await inquirer.prompt([
                    {
                        type: "number",
                        name: "amount",
                        message: "Enter the amount to withdraw:",
                    },
                ]);
                if (withdraw_ans.amount < current_balance && withdraw_ans.amount > 0) {
                    console.log(`\nWithdrawn $${withdraw_ans.amount} from your account.`);
                    current_balance = current_balance - withdraw_ans.amount;
                    console.log(chalk.hex("#FFA500")(`\n Your current balance is: $${current_balance}\n`));
                }
                else {
                    console.log(chalk.red.bold(`\n\t Insufficient balance or invalied Amount.`));
                }
            }
            //    balance check:
            else if (choices.options === "Balance Check") {
                console.log(chalk.hex("#FFA500")(`\n Your Current Balance is: $$${current_balance}\n`));
            }
            // fast cash:
            else if (choices.options === "Fast Cash") {
                const fast_cash = await inquirer.prompt([
                    {
                        type: "list",
                        name: "options",
                        message: chalk.red.bold("Please select an option:"),
                        choices: [
                            "- Withdraw: $100",
                            "- Withdraw: $500",
                            "- withdraw: $1000",
                        ],
                    },
                ]);
                if (fast_cash.options === "- Withdraw: $100" && current_balance >= 100) {
                    console.log(`\nwithdrawn $100 from your account.`);
                    current_balance = current_balance - 100;
                    console.log(chalk.hex("#FFa500")(`\n Your Current Balance is: $${current_balance}\n`));
                }
                else if (fast_cash.options === "- Withdraw: $500" && current_balance >= 500) {
                    console.log(`\nWithdrawn $500 from your account.`);
                    current_balance = current_balance - 500;
                    console.log(chalk.hex("#FFA00")(`\n Your  Current balance is: $${current_balance}\n`));
                }
                else if (fast_cash.options === "- withdraw: $1000" && current_balance >= 1000) {
                    console.log(`\nWithdrawn $1000 from your account.`);
                    current_balance = current_balance - 1000;
                    console.log(chalk.hex("#FFA00")(`\n Your  Current balance is: $${current_balance}\n`));
                }
                else {
                    console.log(chalk.red.bold(`\n\t Insufficient balance or Invalid amount.`));
                }
            }
            const confirmation_ans = await inquirer.prompt({
                type: "confirm",
                name: "user_confirmation",
                message: chalk.red.bold("Do you want to do another transaction.?"),
            });
            if (confirmation_ans.user_confirmation === false) {
                anotherTransaction = false;
            }
        }
        console.log(chalk.yellow.bold("\n\t Thank You for using the ATM. Have a great day!"));
        process.exit(); // Code for program end
    }
}
atm_func();
