const inquirer = require('inquirer');
const role = require('../models/role');
const department = require('../models/department');

async function updateRole(db) {
  try {
    const roleListToUpdate = await role.getRoles(db);
    const updateRoleChoices = roleListToUpdate.map(r => ({ name: r.title, value: r.id }));

    // Fetch departments for role
    const departmentsForRoleUpdate = await department.getDepartments(db);
    const departmentChoicesForRoleUpdate = departmentsForRoleUpdate.map(dept => ({ name: dept.name, value: dept.id }));

    const { updatedRoleId, updatedRoleTitle, updatedRoleSalary, updatedRoleDepartmentId } = await inquirer.prompt([
      {
        name: 'updatedRoleId',
        type: 'list',
        message: 'Which role would you like to update?',
        choices: updateRoleChoices,
      },
      {
        name: 'updatedRoleTitle',
        type: 'input',
        message: 'Enter the new title for the role:',
      },
      {
        name: 'updatedRoleSalary',
        type: 'number',
        message: 'Enter the new salary for the role:',
      },
      {
        name: 'updatedRoleDepartmentId',
        type: 'list',
        message: 'Choose the department for the role:',
        choices: departmentChoicesForRoleUpdate,
      },
    ]);

    await role.updateRole(db, updatedRoleId, updatedRoleTitle, updatedRoleSalary, updatedRoleDepartmentId);
    console.log('\x1b[96m%s\x1b[0m', "Role updated successfully!");
  } catch (error) {
    console.error('Error updating role:', error);
  }
}

module.exports = updateRole;
