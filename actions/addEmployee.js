const inquirer = require('inquirer');
const role = require('../models/role');
const employee = require('../models/employee');

async function addEmployee(db) {
  try {
    const rolesForNewEmployee = await role.getRoles(db);
    const roleChoicesForNewEmployee = rolesForNewEmployee.map(role => ({ name: role.title, value: role.id }));

    const potentialManagers = await employee.getEmployees(db);
    const managerChoices = potentialManagers.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter the employee's first name:"
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter the employee's last name:"
      },
      {
        name: "role_id",
        type: "list",
        message: "Choose the employee's role:",
        choices: roleChoicesForNewEmployee
      },
      {
        name: "manager_id",
        type: "list",
        message: "Choose the employee's manager (or choose 'None' if none):",
        choices: [...managerChoices, { name: "None", value: null }]
      }
    ]);

    await employee.addEmployee(db, first_name, last_name, role_id, manager_id);
    console.log('\x1b[96m%s\x1b[0m', "Employee added successfully!");
  } catch (error) {
    console.error('Error adding employee:', error);
  }
}

module.exports = addEmployee;
