const welcome = require('./middleware/welcome')
const createConnection = require('./config/connection');
const inquirerModule = require('./models/inquirer');
const viewDepartments = require('./actions/viewDepartments');
const viewRoles = require('./actions/viewRoles');
const viewEmployees = require('./actions/viewEmployees');
const addDepartment = require('./actions/addDepartment');
const addRole = require('./actions/addRole');
const addEmployee = require('./actions/addEmployee');
const updateDepartment = require('./actions/updateDepartment');
const updateRole = require('./actions/updateRole');
const updateEmployee = require('./actions/updateEmployee');
const deleteDepartment = require('./actions/deleteDepartment');
const deleteRole = require('./actions/deleteRole');
const deleteEmployee = require('./actions/deleteEmployee');

main();

async function main() {
    const db = await createConnection();
    console.log('\x1b[96m%s\x1b[0m', welcome, "Connected to the database!");
    let shouldExit = false;
    while (!shouldExit) {
        const action = await inquirerModule.getActionChoice();
        switch (action) {
            case "View all departments":
                await viewDepartments(db);
                break;
            case "View all roles":
                await viewRoles(db);
                break;
            case "View all employees":
                await viewEmployees(db);
                break;
            case "Add a department":
                await addDepartment(db);
                break;
            case "Add a role":
                await addRole(db);
                break;
            case "Add an employee":
                await addEmployee(db);
                break;
            case "Update a department":
                await updateDepartment(db);
                break;
            case "Update a role":
                await updateRole(db)
                break;
            case "Update an employee":
                await updateEmployee(db);
                break;
            case "Delete a department":
                await deleteDepartment(db);
                break;
            case "Delete a role":
                await deleteRole(db);
                break;
            case "Delete an employee":
                await deleteEmployee(db);
                break;
            case "Exit": {
                shouldExit = true;
                break;
            }
        }
    }
    console.log("Thank you, and Goodbye!");
    await db.end();
}
