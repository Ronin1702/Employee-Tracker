const mysql = require('mysql2/promise');
require('dotenv').config();

async function getRoles(db) {
    const [rows] = await db.query(`SELECT * FROM role`);
    return rows;
}

async function addRole(db, title, salary, department_id) {
    await db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department_id]);
}

module.exports = {
    getRoles,
    addRole
};
