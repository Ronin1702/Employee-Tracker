async function getRoles(db) {
    const [rows] = await db.query(`
        SELECT role.id, role.title, role.salary, role.department_id, department.name AS department_name
        FROM role
        INNER JOIN department ON role.department_id = department.id
    `);
    return rows;
}

async function addRole(db, title, salary, department_id) {
    await db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department_id]);
};

async function updateRole(db, id, title, salary, department_id) {
    await db.query(`UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?`, [title, salary, department_id, id]);
}

async function deleteRole(db, id) {
    await db.query(`DELETE FROM role WHERE id = ?`, [id]);
};

module.exports = {
    getRoles,
    addRole,
    updateRole,
    deleteRole
};
