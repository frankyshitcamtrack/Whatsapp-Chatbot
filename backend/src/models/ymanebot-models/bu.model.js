const pool = require('../../config/db')

//Crud operation Business Unit
function insertBU(name) {
   pool.query(
      'INSERT INTO Business_unit SET bu_name = ?',
      [ name ]
    );
}

async function getBU() {
    const result = await pool.query('SELECT * FROM Business_unit WHERE isDelete=0');
    return result[0];
}

async function getBuById(id) {
    const result = await pool.query(`SELECT * FROM Business_unit WHERE id=${id} AND isDelete=0`);
    return result[0];
}

async function deleteBU(idBU){
    pool.query(
        `UPDATE Business_unit SET isDelete = 1 WHERE id=${idBU}`,
      );
}

async function updateBU(idBU,name){
    pool.query('UPDATE Business_unit SET bu_name = ? WHERE id = ?', [name, idBU]);
}



module.exports = {
    insertBU,
    getBU,
    updateBU,
    deleteBU,
    getBuById,
}