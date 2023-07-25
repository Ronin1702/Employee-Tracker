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
                "Update an employee role",
                "Exit"
            ]
        });

        switch (answer.action) {
            case "View all departments":
                const departments = await department.getDepartments(db);
                console.table(departments);
                break;
            case "View all roles":
                const roles = await role.getRoles(db);
                console.table(roles);
                break;
            case "View all employees":
                const employees = await employee.getEmployees(db);
                console.table(employees);
                break;
            case "Add a department":
                const { name } = await inquirer.prompt({
                    name: "name",
                    type: "input",
                    message: "Enter the department name:"
                });
                await department.addDepartment(db, name);
                console.log("Department added successfully!");
                break;
            case "Add a role":
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
                        type: "number",
                        message: "Enter the department ID:"
                    }
                ]);
                await role.addRole(db, title, salary, department_id);
                console.log("Role added successfully!");
                break;
            case "Add an employee":
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
                        type: "number",
                        message: "Enter the employee's role ID:"
                    },
                    {
                        name: "manager_id",
                        type: "number",
                        message: "Enter the employee's manager's ID (or leave blank if none):",
                        default: null
                    }
                ]);
                await employee.addEmployee(db, first_name, last_name, role_id, manager_id);
                console.log("Employee added successfully!");
                break;
            case "Update an employee role":
                const { employee_id, new_role_id } = await inquirer.prompt([
                    {
                        name: "employee_id",
                        type: "number",
                        message: "Enter the ID of the employee you want to update:"
                    },
                    {
                        name: "new_role_id",
                        type: "number",
                        message: "Enter the new role ID for this employee:"
                    }
                ]);
                await employee.updateEmployeeRole(db, employee_id, new_role_id);
                console.log("Employee role updated successfully!");
                break;
            case "Exit":
                shouldExit = true;
                break;
        }
    }

    console.log("Goodbye!");
    await db.end();
}
