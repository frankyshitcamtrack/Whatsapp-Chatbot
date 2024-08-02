const pool = require('../../config/db');


async function getCampagne(){
    const result =await pool.query('SELECT * FROM pushs_campagnes WHERE isDelete=0');
    return result[0];
}


async function getCampagneById(id){
    const result = await pool.query(`SELECT * FROM pushs_campagnes WHERE id=${id} AND isDelete=0`)
}


function insertCampagne(name,typeCampagne,content_text,content_media,date_creation,isDelete,TypeContact) {
    return pool.query(
        'INSERT INTO contact SET name= ?, idType_campagnes= ?, content_text= ?, content_media= ?, date_creation= ?, idType_contact= ?',
        [name,typeCampagne,content_text,content_media,date_creation,isDelete,TypeContact]
    );
}
  


module.exports={getCampagne,getCampagneById,insertCampagne}