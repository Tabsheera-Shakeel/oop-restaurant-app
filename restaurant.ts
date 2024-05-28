#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

interface IDish{
    name:string;
    price:number;
}

interface ITable{
    number:number
    capacity:number;
}

interface IRestaurant{
    name:string;
    location:string;
    openingHours:string;
    table:ITable[];
    menu:IDish[];
    addTable(Table: ITable):void;
    addDish(Dish: IDish):void;
}

class Dish {
    constructor(public name: string,
         public price: number){}
}

class Table {
    constructor(public number:number, 
        public capacity:number){}
}

class Restaurant {
    constructor(public name:string,
        public location:string,
        public openingHours:string,
        public table: ITable[]=[],
        public menu: IDish[]=[]) {}

AddTable(table: ITable): void{
    this.table.push(table)
}

addDish(dish: IDish): void{
    this.menu.push(dish);
}
totalBill():number{
    return this.menu.reduce((total,dish)=>total + dish.price,0)
}
}
console.log(chalk.magenta("WELCOME TO FOODIE DOODIE RESTAURANT✨"));

async function DishDetails(): Promise<IDish>{
    const answers = await inquirer.prompt([{
        name:"Dish",
        type:"input",
        message:(chalk.cyan("PLACE YOUR ORDER PLEASE")),
        validate: (input: string)=> input.trim() !==""
  },{
       name:"price",
       type:"number",
       message:(chalk.green("ENTER THE PRICE OF THE DISH THAT YOU ORDERED")),
  }
]);
return{name: answers.Dish, price: answers.price};
}
async function addmore():Promise<boolean> {
    const answer = await inquirer.prompt([
        {
        name:"addmore",
        type:"confirm",
        message:(chalk.blue("WOULD YOU LIKE TO ORDER SOMETHING ELSE?")),
    }
]);
return answer.addmore;
}
async function main() {
    const myRestaurant = new Restaurant("Foodie Doodie", "street 4" ,"11am to 11pm")
const myTable = new Table(1,6);
myRestaurant.AddTable(myTable);


let continueOrdering = true;
while(continueOrdering){
    console.log(chalk.cyan(`\nOrdering Food${myRestaurant.menu.length + 1}:`));
    const dish = await DishDetails();
    myRestaurant.addDish(dish);

    continueOrdering = await addmore();

}

console.log(chalk.cyan("\nYOUR ORDERED DISHES:"));
myRestaurant.menu.forEach((dish,index)=>{
    console.log(`${index + 1}. ${dish.name} ${dish.price}`);
});
const getotalBill = myRestaurant.totalBill();
console.log(chalk.greenBright(`\n Total bill: ${getotalBill}`));
console.log(chalk.blue.bold("ENJOY YOUR FOOD!✨"));
}
main();