const Table = require('cli-table3');
const employee = require('../models/employee');

async function viewEmployees(db) {
  try {
    const employees = await employee.getEmployees(db);
    const table = new Table({
      head: ['ID', 'First Name', 'Last Name', 'Role', 'Department', 'Manager', 'Salary'],
      colWidths: [5, 15, 15, 15, 15, 15, 15]
    });

    employees.forEach(employee => {
      table.push([employee.id, employee.first_name, employee.last_name, employee.title, employee.department, employee.manager || "", employee.salary]);
    });

    console.log(table.toString());
  } catch (error) {
    console.error('Error viewing employees:', error);
  }
}

module.exports = viewEmployees;
