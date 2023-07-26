// Importing required modules
const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
require('dotenv').config();

const department = require('./models/department');
const role = require('./models/role');
const employee = require('./models/employee');

const Table = require('cli-table3');
const welcome = require('./middleware/welcome')

main();

async function main() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
    console.log('\x1b[96m%s\x1b[0m', welcome, "Connected to the database!");

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
                break;
            }
            case "View all roles": {
                const roles = await role.getRoles(db);
                const table = new Table({
                    head: ['ID', 'Title', 'Salary', 'Department'],
                    colWidths: [5, 15, 15, 15]
                });

                roles.forEach(role => {
                    table.push([role.id, role.title, role.salary, role.department_name]);
                });

                console.log(table.toString());
                break;
            }

            case "View all employees": {
                const employees = await employee.getEmployees(db);

                const table = new Table({
                    head: ['ID', 'First Name', 'Last Name', 'Role', 'Department', 'Manager', 'Salary'],
                    colWidths: [5, 15, 15, 15, 15, 15, 15]
                });

                employees.forEach(employee => {
                    table.push([employee.id, employee.first_name, employee.last_name, employee.title, employee.department, employee.manager || "", employee.salary]);
                });

                console.log(table.toString());
                break;
            }

            case "Add a department": {
                const { name } = await inquirer.prompt({
                    name: "name",
                    type: "input",
                    message: "Enter the department name:"
                });
                await department.addDepartment(db, name);
                console.log('\x1b[96m%s\x1b[0m', "Department added successfully!");
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
                console.log('\x1b[96m%s\x1b[0m', "Role added successfully!");
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
                console.log('\x1b[96m%s\x1b[0m', "Employee added successfully!");
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
                console.log('\x1b[96m%s\x1b[0m', "Department updated successfully!");
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
                console.log('\x1b[96m%s\x1b[0m', "Role updated successfully!");
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
                console.log('\x1b[96m%s\x1b[0m', "Employee updated successfully!");
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
                break;
            }

            case "Delete a role": {
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
                    try {
                        await role.deleteRole(db, roleIdToDelete);
                        console.log('\x1b[96m%s\x1b[0m', "Role deleted successfully!");
                    } catch (error) {
                        console.error('Error deleting role:', error);
                    }
                }
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
                console.log('\x1b[96m%s\x1b[0m', "Employee deleted successfully!");
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
