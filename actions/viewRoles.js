const Table = require('cli-table3');
const role = require('../models/role');

async function viewRoles(db) {
  try {
    const roles = await role.getRoles(db);
    const table = new Table({
      head: ['ID', 'Title', 'Salary', 'Department'],
      colWidths: [5, 15, 15, 15]
    });

    roles.forEach(role => {
      table.push([role.id, role.title, role.salary, role.department_name]);
    });

    console.log(table.toString());
  } catch (error) {
    console.error('Error viewing roles:', error);
  }
}

module.exports = viewRoles;
