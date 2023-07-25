const mysql = require('mysql2/promise');
require('dotenv').config();

async function getEmployees(db) {
    const [rows] = await db.query(`SELECT * FROM employee`);
    return rows;
}

async function addEmployee(db, first_name, last_name, role_id, manager_id) {
    manager_id = manager_id ? manager_id : null;
    await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id]);
}


async function updateEmployeeRole(db, employee_id, role_id) {
    await db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [role_id, employee_id]);
}

module.exports = {
    getEmployees,
    addEmployee,
    updateEmployeeRole
};
