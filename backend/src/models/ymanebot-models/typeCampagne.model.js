const pool = require('../../config/db')

 
//Crud operation type Campagne
async function getTypeCampagne() {
     const result = await pool.query('SELECT * FROM types_campagnes WHERE isDelete=0');
     return result[0];
 }
 
 async function getTypeCampagneById(id) {
     const result = await pool.query(`SELECT * FROM types_campagnes WHERE id=${id} AND isDelete=0`);
     return result[0];
 }
 
 function insertTypeCampagne(name) {
    pool.query(
       'INSERT INTO types_campagnes SET name = ?',
       [ name ]
     );
 }

 async function updateTypeCampagne(id,name){
    pool.query('UPDATE types_campagnes SET name = ? WHERE id = ?', [name, id]);
}

async function incrementNombrePush(id){
    pool.query('UPDATE types_campagnes SET Nombre_push_cree = Nombre_push_cree + 1 WHERE id = ?', [id]);
}

async function deleteTypeCampagne(id){
    pool.query(
        `UPDATE types_campagnes SET isDelete = 1 WHERE id=${id}`,
      );
}


module.exports = {
    insertTypeCampagne,
    getTypeCampagne,
    getTypeCampagneById,
    deleteTypeCampagne,
    updateTypeCampagne,
    incrementNombrePush
}