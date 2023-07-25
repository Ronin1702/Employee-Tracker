const mysql = require('mysql2/promise');
require('dotenv').config();

async function getDepartments(db) {
    const [rows] = await db.query(`SELECT * FROM department`);
    return rows;
}

async function addDepartment(db, name) {
    await db.query(`INSERT INTO department (name) VALUES (?)`, [name]);
}

module.exports = {
    getDepartments,
    addDepartment
};
