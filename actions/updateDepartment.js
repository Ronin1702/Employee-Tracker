const inquirer = require('inquirer');
const department = require('../models/department');

async function updateDepartment(db) {
  try {
    const depListToUpdate = await department.getDepartments(db);
    const updateDepartmentChoices = depListToUpdate.map(dept => ({ name: dept.name, value: dept.id }));
    const { updatedDepartmentId, updatedDepartmentName } = await inquirer.prompt([
      {
        name: 'updatedDepartmentId',
        type: 'list',
        message: 'Which department would you like to update?',
        choices: updateDepartmentChoices,
      },
      {
        name: 'updatedDepartmentName',
        type: 'input',
        message: 'Enter the new name for the department:',
      }
    ]);

    await department.updateDepartment(db, updatedDepartmentId, updatedDepartmentName);
    console.log('\x1b[96m%s\x1b[0m', "Department updated successfully!");
  } catch (error) {
    console.error('Error updating department:', error);
  }
}

module.exports = updateDepartment;
