const inquirer = require('inquirer');
const department = require('../models/department');
const role = require('../models/role');

async function deleteDepartment(db) {
  try {
    const depListToDelete = await department.getDepartments(db);
    const deleteDepartmentChoices = depListToDelete.map(dept => ({ name: dept.name, value: dept.id }));
    const { departmentIdToDelete } = await inquirer.prompt([
      {
        name: 'departmentIdToDelete',
        type: 'list',
        message: 'Which department would you like to delete?',
        choices: deleteDepartmentChoices,
      }
    ]);

    // Fetch all roles from the database
    const roles = await role.getRoles(db);
    // Check if there are any roles associated with the department
    const associatedRoles = roles.filter(role => role.department_id === departmentIdToDelete);

    if (associatedRoles.length > 0) {
      console.warn(`Cannot delete department. There are ${associatedRoles.length} role(s) associated with this department.`);
    } else {
      await department.deleteDepartment(db, departmentIdToDelete);
      console.log('\x1b[96m%s\x1b[0m', "Department deleted successfully!");
    }
  } catch (error) {
    console.error('Error deleting department:', error);
  }
}

module.exports = deleteDepartment;
