const mysql = require('mysql2');

const pool = mysql.createConnection({
  host: 'localhost',
  port: '33060',
  user: 'root',
  database: 'node-complete',
  password: 'password'
})

module.exports = pool.promise();
