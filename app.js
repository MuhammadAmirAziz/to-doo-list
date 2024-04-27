#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todolist = [];
let condition = true;
console.log(chalk.gray.bold("\n \t============================================="));
console.log(chalk.greenBright.bold("\t <<======= Wellcome My To_Do_List =======>>"));
console.log(chalk.gray.bold("\t=============================================\n"));
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellow.bold("Select an option you want to do:"),
                choices: ["Add Task", "Delete Task", "Update Task", "My Too Doo List", "Exit"]
            }
        ]);
        if (option.choice === "Add Task") {
            await addtask();
        }
        else if (option.choice === "Delete Task") {
            await deletetask();
        }
        else if (option.choice === "Update Task") {
            await updatetask();
        }
        else if (option.choice === "My Too Doo List") {
            await viewtask();
        }
        else if (option.choice === "Exit") {
            condition = false;
        }
    }
};
let addtask = async () => {
    let newtask = await inquirer.prompt([
        {
            name: "task",
            message: chalk.blue.bold("Enter Your New Task"),
            type: "input"
        }
    ]);
    todolist.push(newtask.task);
    console.log(chalk.blue.bold(`\n \t ${newtask.task} task Added Successfully in To_Do_List`));
};
let viewtask = () => {
    console.log(chalk.red.bold("Your To_Do_List :"));
    todolist.forEach((task, index) => {
        console.log(chalk.green.bold(`${index + 1}: ${task}`));
    });
};
let deletetask = async () => {
    await viewtask();
    let taskindex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.red.bold("Enter the index of the task you want to delete :"),
        }
    ]);
    let deletedtask = todolist.splice(taskindex.index - 1, 1);
    console.log(chalk.gray.bold(`\n ${deletedtask} this task has been deleted successfully from your Too_Doo_List`));
};
let updatetask = async () => {
    await viewtask;
    let updatetaskindex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.magenta.bold("Enter the index no of the you want to update")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.magenta.bold("Now Enter new task name :"),
        }
    ]);
    todolist[updatetaskindex.index - 1] = updatetaskindex.new_task;
    console.log(chalk.green.bold(`\n Task at index no. ${updatetaskindex.index - 1} update successfully [for updated list check opion: "My Too Doo List"]`));
};
main();
