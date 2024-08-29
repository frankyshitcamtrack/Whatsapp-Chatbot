const mysql = require('mysql2/promise') ;

const pass_db = process.env.PASS_DB;
const user_db = process.env.USER_DB;
const db = process.env.DB;
const host = process.env.HOST;

const pool = mysql.createPool(
    {
        user: user_db,
        host: host,
        database:db,
        password: pass_db,
        port: 3306,
    },
    {multipleStatements: true}
);



module.exports= pool;

