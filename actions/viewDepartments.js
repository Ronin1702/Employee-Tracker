const Table = require('cli-table3');
const department = require('../models/department');
const employee = require('../models/employee');

async function viewDepartments(db) {
  const departments = await department.getDepartments(db);
  const table = new Table({
    head: ['ID', 'Name', 'Total Utilized Budget', 'Total Budget'],
    colWidths: [5, 15, 25, 15]
  });

  for (const department of departments) {
    const totalUtilizedBudget = await employee.getTotalUtilizedBudgetByDepartmentId(db, department.id);
    const totalBudget = await employee.getTotalBudgetByDepartmentId(db, department.id);
    table.push([department.id, department.name, totalUtilizedBudget, totalBudget]);
  }
  console.log(table.toString());
}

module.exports = viewDepartments;
