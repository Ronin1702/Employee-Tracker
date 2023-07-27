const mysql = require('mysql2/promise');
require('dotenv').config();

async function createConnection() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(400); 
  }
}

module.exports = createConnection;