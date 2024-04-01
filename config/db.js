const mysql = require('mysql2/promise');

const SQLpool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '6467',
    database: 'phvsnevpmq' 
});

module.exports = SQLpool;