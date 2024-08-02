const pool = require('../../config/db')

 
//Crud operation type Contact
async function getTypeContact() {
     const result = await pool.query('SELECT * FROM type_contact WHERE isDelete=0');
     return result[0];
 }
 
 async function getTypeContactById(id) {
     const result = await pool.query(`SELECT * FROM type_contact WHERE id=${id} AND isDelete=0`);
     return result[0];
 }

 async function getTypeContactByName(name) {
    const result = await pool.query(`SELECT * FROM type_contact WHERE name=${name} AND isDelete=0`);
    return result[0];
}

 
 function insertTypeContact(name) {
    pool.query(
       'INSERT INTO type_contact SET name = ?',
       [ name ]
     );
 }

 async function updateTypeContact(id,name){
    pool.query('UPDATE type_contact SET name = ? WHERE id = ?', [name, id]);
}

async function deleteTypeContact(id){
    pool.query(
        `UPDATE type_contact SET isDelete = 1 WHERE id=${id}`,
      );
}


module.exports = {
    getTypeContact,
    getTypeContactById,
    insertTypeContact,
    updateTypeContact,
    deleteTypeContact,
    getTypeContactByName
}