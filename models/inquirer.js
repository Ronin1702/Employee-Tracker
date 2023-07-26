const inquirer = require('inquirer');

async function getActionChoice() {
  const answer = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update a department",
      "Update a role",
      "Update an employee",
      "Delete a department",
      "Delete a role",
      "Delete an employee",
      "Exit"
    ]
  });

  return answer.action;
}

module.exports = { getActionChoice };
