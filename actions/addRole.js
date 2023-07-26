const inquirer = require('inquirer');
const department = require('../models/department');
const role = require('../models/role');

async function addRole(db) {
  try {
    const departments = await department.getDepartments(db);
    const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));
    const { title, salary, department_id } = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the role title:"
      },
      {
        name: "salary",
        type: "number",
        message: "Enter the role salary:"
      },
      {
        name: "department_id",
        type: "list",
        message: "Choose the department:",
        choices: departmentChoices
      }
    ]);

    await role.addRole(db, title, salary, department_id);
    console.log('\x1b[96m%s\x1b[0m', "Role added successfully!");
  } catch (error) {
    console.error('Error adding role:', error);
  }
}

module.exports = addRole;
