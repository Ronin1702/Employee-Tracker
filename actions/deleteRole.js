const inquirer = require('inquirer');
const role = require('../models/role');
const employee = require('../models/employee');

async function deleteRole(db) {
  try {
    const roleListToDelete = await role.getRoles(db);
    const deleteRoleChoices = roleListToDelete.map(role => ({ name: role.title, value: role.id }));
    const { roleIdToDelete } = await inquirer.prompt([
      {
        name: 'roleIdToDelete',
        type: 'list',
        message: 'Which role would you like to delete?',
        choices: deleteRoleChoices,
      }
    ]);

    // Fetch all employees with the role to be deleted
    const associatedEmployees = await employee.getEmployeesByRoleId(db, roleIdToDelete);

    // Check if there are any employees associated with the role
    if (associatedEmployees.length > 0) {
      console.warn(`Cannot delete. There are ${associatedEmployees.length} employee(s) associated with this role.`);
    } else {
      await role.deleteRole(db, roleIdToDelete);
      console.log('\x1b[96m%s\x1b[0m', "Role deleted successfully!");
    }
  } catch (error) {
    console.error('Error deleting role:', error);
  }
}

module.exports = deleteRole;
