const pool = require('../../config/db')

 
//Crud operation roles
 function insertRole(name) {
    pool.query(
       'INSERT INTO roles SET name = ?',
       [ name ]
     );
 }

 async function updateRole(idBU,name){
    pool.query('UPDATE roles SET name = ? WHERE id = ?', [name, idBU]);
}


async function getRoles() {
    const result = await pool.query('SELECT * FROM Roles WHERE isDelete=0');
    return result[0];
}


async function deleteRole(idBU){
    pool.query(
        `UPDATE roles SET isDelete = 1 WHERE id=${idBU}`,
      );
}


module.exports = {
    insertRole,
    updateRole,
    deleteRole,
    getRoles
}