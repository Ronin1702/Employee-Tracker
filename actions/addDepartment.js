const inquirer = require('inquirer');
const department = require('../models/department');

async function addDepartment(db) {
  try {
    const { name } = await inquirer.prompt({
      name: "name",
      type: "input",
      message: "Enter the department name:"
    });

    await department.addDepartment(db, name);
    console.log('\x1b[96m%s\x1b[0m', "Department added successfully!");
  } catch (error) {
    console.error('Error adding department:', error);
  }
}

module.exports = addDepartment;
