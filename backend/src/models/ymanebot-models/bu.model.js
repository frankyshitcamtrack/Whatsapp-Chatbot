const pool = require('../../config/db')

//Crud operation Business Unit
function insertBU(name) {
   pool.query(
      'INSERT INTO business_unit SET bu_name = ?',
      [ name ]
    );
}

async function getBU() {
    const result = await pool.query('SELECT * FROM business_unit WHERE isDelete=0');
    return result[0];
}

async function getBuById(id) {
    const result = await pool.query(`SELECT * FROM business_unit WHERE id=${id} AND isDelete=0`);
    return result[0];
}

async function deleteBU(idBU){
    pool.query(
        `UPDATE business_unit SET isDelete = 1 WHERE id=${idBU}`,
      );
}

async function updateBU(idBU,name){
    pool.query('UPDATE business_unit SET bu_name = ? WHERE id = ?', [name, idBU]);
}



module.exports = {
    insertBU,
    getBU,
    updateBU,
    deleteBU,
    getBuById,
}