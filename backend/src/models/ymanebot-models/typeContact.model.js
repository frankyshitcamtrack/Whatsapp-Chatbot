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
    const result = await pool.query('SELECT * FROM type_contact WHERE typeContact_name= ? AND isDelete=0',[name]);
    return result[0];
}

 
 function insertTypeContact(name) {
    pool.query(
       'INSERT INTO type_contact SET typeContact_name = ?',
       [ name ]
     );
 }

 async function updateTypeContact(id,typeContact_name){
    pool.query('UPDATE type_contact SET typeContact_name = ? WHERE id = ?', [typeContact_name, id]);
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