import inquirer from "inquirer";
import chalk from "chalk";
class Dish {
    name;
    price;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
class Table {
    number;
    capacity;
    constructor(number, capacity) {
        this.number = number;
        this.capacity = capacity;
    }
}
class Restaurant {
    name;
    location;
    openingHours;
    table;
    menu;
    constructor(name, location, openingHours, table = [], menu = []) {
        this.name = name;
        this.location = location;
        this.openingHours = openingHours;
        this.table = table;
        this.menu = menu;
    }
    AddTable(table) {
        this.table.push(table);
    }
    addDish(dish) {
        this.menu.push(dish);
    }
    totalBill() {
        return this.menu.reduce((total, dish) => total + dish.price, 0);
    }
}
console.log(chalk.magenta("WELCOME TO FOODIE DOODIE RESTAURANT✨"));
async function DishDetails() {
    const answers = await inquirer.prompt([{
            name: "Dish",
            type: "input",
            message: (chalk.cyan("PLACE YOUR ORDER PLEASE")),
            validate: (input) => input.trim() !== ""
        }, {
            name: "price",
            type: "number",
            message: (chalk.green("ENTER THE PRICE OF THE DISH THAT YOU ORDERED")),
        }]);
    return { name: answers.Dish, price: answers.price };
}
async function addmore() {
    const answer = await inquirer.prompt([
        {
            name: "addmore",
            type: "confirm",
            message: (chalk.blue("WOULD YOU LIKE TO ORDER SOMETHING ELSE?")),
        }
    ]);
    return answer.addmore;
}
async function main() {
    const myRestaurant = new Restaurant("Foodie Doodie", "street 4", "11am to 11pm");
    const myTable = new Table(1, 6);
    myRestaurant.AddTable(myTable);
    let continueOrdering = true;
    while (continueOrdering) {
        console.log(chalk.cyan(`\nOrdering Food${myRestaurant.menu.length + 1}:`));
        const dish = await DishDetails();
        myRestaurant.addDish(dish);
        continueOrdering = await addmore();
    }
    console.log(chalk.cyan("\nYOUR ORDERED DISHES:"));
    myRestaurant.menu.forEach((dish, index) => {
        console.log(`${index + 1}. ${dish.name} ${dish.price}`);
    });
    const getotalBill = myRestaurant.totalBill();
    console.log(chalk.greenBright(`\n Total bill: ${getotalBill}`));
    console.log(chalk.blue.bold("ENJOY YOUR FOOD!✨"));
}
main();
