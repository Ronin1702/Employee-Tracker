const inquirer = require('inquirer');
const employee = require('../models/employee');
const role = require('../models/role');

async function updateEmployee(db) {
  try {
    const employeeListToUpdate = await employee.getEmployees(db);
    const updateEmployeeChoices = employeeListToUpdate.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    // Fetch roles for employee
    const rolesForEmployeeUpdate = await role.getRoles(db);
    const roleChoicesForEmployeeUpdate = rolesForEmployeeUpdate.map(role => ({ name: role.title, value: role.id }));

    // Fetch employees for potential managers
    const potentialManagersForUpdate = await employee.getEmployees(db);
    const managerChoicesForUpdate = potentialManagersForUpdate.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    const { updatedEmployeeId, updatedEmployeeFirstName, updatedEmployeeLastName, updatedEmployeeRoleId, updatedEmployeeManagerId } = await inquirer.prompt([
      {
        name: 'updatedEmployeeId',
        type: 'list',
        message: 'Which employee would you like to update?',
        choices: updateEmployeeChoices,
      },
      {
        name: 'updatedEmployeeFirstName',
        type: 'input',
        message: 'Enter the new first name for the employee:',
      },
      {
        name: 'updatedEmployeeLastName',
        type: 'input',
        message: 'Enter the new last name for the employee:',
      },
      {
        name: 'updatedEmployeeRoleId',
        type: 'list',
        message: 'Choose the new role for the employee:',
        choices: roleChoicesForEmployeeUpdate,
      },
      {
        name: 'updatedEmployeeManagerId',
        type: 'list',
        message: 'Choose the new manager for the employee (or choose \'None\' if none):',
        choices: [...managerChoicesForUpdate, { name: "None", value: null }]
      },
    ]);

    await employee.updateEmployee(db, updatedEmployeeId, updatedEmployeeFirstName, updatedEmployeeLastName, updatedEmployeeRoleId, updatedEmployeeManagerId);
    console.log('\x1b[96m%s\x1b[0m', "Employee updated successfully!");
  } catch (error) {
    console.error('Error updating employee:', error);
  }
}

module.exports = updateEmployee;
