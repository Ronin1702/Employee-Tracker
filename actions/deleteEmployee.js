const inquirer = require('inquirer');
const employee = require('../models/employee');

async function deleteEmployee(db) {
  try {
    const employeeListToDelete = await employee.getEmployees(db);
    const deleteEmployeeChoices = employeeListToDelete.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
    const { employeeIdToDelete } = await inquirer.prompt([
      {
        name: 'employeeIdToDelete',
        type: 'list',
        message: 'Which employee would you like to delete?',
        choices: deleteEmployeeChoices,
      }
    ]);

    await employee.deleteEmployee(db, employeeIdToDelete);
    console.log('\x1b[96m%s\x1b[0m', "Employee deleted successfully!");
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
}

module.exports = deleteEmployee;
