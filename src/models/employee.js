async function getEmployees(db) {
    const [rows] = await db.query(`
        SELECT 
            e.id,
            e.first_name,
            e.last_name,
            r.title,
            d.name AS department,
            r.salary,
            CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM 
            employee e
        LEFT JOIN 
            role r ON e.role_id = r.id
        LEFT JOIN 
            department d ON r.department_id = d.id
        LEFT JOIN
            employee m ON e.manager_id = m.id
    `);
    return rows;
}


async function addEmployee(db, first_name, last_name, role_id, manager_id) {
    manager_id = manager_id ? manager_id : null;
    await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id]);
}


async function updateEmployee(db, id, first_name, last_name, role_id, manager_id) {
    await db.query(`UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?`, [first_name, last_name, role_id, manager_id, id]);
}

async function deleteEmployee(db, id) {
    await db.query(`DELETE FROM employee WHERE id = ?`, [id]);
}

async function getEmployeesByRoleId(db, role_id) {
    const [rows] = await db.query(`
        SELECT *
        FROM employee 
        WHERE role_id = ?
    `, [role_id]);
    return rows;
}

module.exports = {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeesByRoleId
};
