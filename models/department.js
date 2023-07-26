
async function getDepartments(db) {
    const [rows] = await db.query(`SELECT * FROM department`);
    return rows;
}

async function addDepartment(db, name) {
    await db.query(`INSERT INTO department (name) VALUES (?)`, [name]);
}

async function updateDepartment(db, id, name) {
    await db.query(`UPDATE department SET name = ? WHERE id = ?`, [name, id]);
}

async function deleteDepartment(db, id) {
    await db.query(`DELETE FROM department WHERE id = ?`, [id]);
}

module.exports = {
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment
};
