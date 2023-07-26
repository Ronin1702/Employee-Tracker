// Importing required modules
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
require('dotenv').config();

const department = require('./models/department');
const role = require('./models/role');
const employee = require('./models/employee');

// Start the main function
main();

async function main() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
    console.log("Connected to the database!");

    let shouldExit = false;

    while (!shouldExit) {
        const answer = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update a department",
                "Update a role",
                "Update an employee",
                "Delete a department",
                "Delete a role",
                "Delete an employee",
                "Exit"
            ]
        });

        switch (answer.action) {
            case "View all departments": {
                const departments = await department.getDepartments(db);
                console.table(departments);
                break;
            }
            case "View all roles": {
                const roles = await role.getRoles(db);
                console.table(roles);
                break;
            }
            case "View all employees": {
                const employees = await employee.getEmployees(db);
                console.table(employees);
                break;
            }
            case "Add a department": {
                const { name } = await inquirer.prompt({
                    name: "name",
                    type: "input",
                    message: "Enter the department name:"
                });
                await department.addDepartment(db, name);
                console.log("Department added successfully!");
                break;
            }
            case "Add a role": {
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
                console.log("Role added successfully!");
                break;
            }
            case "Add an employee": {
                const rolesForNewEmployee = await role.getRoles(db);
                const roleChoicesForNewEmployee = rolesForNewEmployee.map(role => ({ name: role.title, value: role.id }));

                // Fetch employees for potential managers
                const potentialManagers = await employee.getEmployees(db);
                const managerChoices = potentialManagers.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

                const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
                    {
                        name: "first_name",
                        type: "input",
                        message: "Enter the employee's first name:"
                    },
                    {
                        name: "last_name",
                        type: "input",
                        message: "Enter the employee's last name:"
                    },
                    {
                        name: "role_id",
                        type: "list",
                        message: "Choose the employee's role:",
                        choices: roleChoicesForNewEmployee
                    },
                    {
                        name: "manager_id",
                        type: "list",
                        message: "Choose the employee's manager (or choose 'None' if none):",
                        choices: [...managerChoices, { name: "None", value: null }]
                    }
                ]);
                await employee.addEmployee(db, first_name, last_name, role_id, manager_id);
                console.log("Employee added successfully!");
                break;
            }

            case "Update a department": {
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
                console.log("Department updated successfully!");
                break;
            }
            case "Update a role": {
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
                console.log("Role updated successfully!");
                break;

            }
            case "Update an employee": {
                const employeeListToUpdate = await employee.getEmployees(db);
                const updateEmployeeChoices = employeeListToUpdate.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

                // Fetch roles for employee
                const rolesForEmployeeUpdate = await role.getRoles(db);
                const roleChoicesForEmployeeUpdate = rolesForEmployeeUpdate.map(role => ({ name: role.title, value: role.id }));

                // Fetch employees for potential managers
                const potentialManagersForUpdate = await employee.getEmployees(db);
                const managerChoicesForUpdate = potentialManagersForUpdate.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

                const { updatedEmployeeId, updatedEmployeeFirstName, updatedEmployeeLastName, updatedEmployeeRoleId, updatedEmployeeManagerId } = await inquirer.prompt([
                    {
                        name: 'updatedEmployeeId',
                        type: 'list',
                        message: 'Which employee would you like to update?',
                        choices: updateEmployeeChoices,
                    },
                    {
                        name: 'updatedEmployeeFirstName',
                        type: 'input',
                        message: 'Enter the new first name for the employee:',
                    },
                    {
                        name: 'updatedEmployeeLastName',
                        type: 'input',
                        message: 'Enter the new last name for the employee:',
                    },
                    {
                        name: 'updatedEmployeeRoleId',
                        type: 'list',
                        message: 'Choose the new role for the employee:',
                        choices: roleChoicesForEmployeeUpdate,
                    },
                    {
                        name: 'updatedEmployeeManagerId',
                        type: 'list',
                        message: 'Choose the new manager for the employee (or choose \'None\' if none):',
                        choices: [...managerChoicesForUpdate, { name: "None", value: null }]
                    },
                ]);
                await employee.updateEmployee(db, updatedEmployeeId, updatedEmployeeFirstName, updatedEmployeeLastName, updatedEmployeeRoleId, updatedEmployeeManagerId);
                console.log("Employee updated successfully!");
                break;
            }

            case "Delete a department": {
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
                await department.deleteDepartment(db, departmentIdToDelete);
                console.log("Department deleted successfully!");
                break;
            }
            case "Delete a role": {
                const roleListToDelete = await role.getRoles(db);
                const deleteRoleChoices = roleListToDelete.map(r => ({ name: r.title, value: r.id }));
                const { roleIdToDelete } = await inquirer.prompt([
                    {
                        name: 'roleIdToDelete',
                        type: 'list',
                        message: 'Which role would you like to delete?',
                        choices: deleteRoleChoices,
                    }
                ]);
                await role.deleteRole(db, roleIdToDelete);
                console.log("Role deleted successfully!");
                break;
            }
            case "Delete an employee": {
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
                console.log("Employee deleted successfully!");
                break;
            }
            case "Exit": {
                shouldExit = true;
                break;
            }
        }
    }

    console.log("Goodbye!");
    await db.end();
}
