const pool = require('../../config/db');


async function getCampagne(){
    const result = await pool.query(`SELECT * FROM pushs_campagnes INNER JOIN users ON pushs_campagnes.id_user=users.user_id
                                                                   INNER JOIN types_campagnes ON pushs_campagnes.idType_campagnes=types_campagnes.id
                                                                   INNER JOIN type_contact ON pushs_campagnes.idType_contact=type_contact.id 
                                                                   WHERE pushs_campagnes.isDelete=0`
                                                                );
    return result[0];
}


async function getCampagneById(id){
    const result = await pool.query(`SELECT * FROM pushs_campagnes INNER JOIN users ON pushs_campagnes.id_user=users.user_id WHERE pushs_campagnes.id=${id} AND pushs_campagnes.isDelete=0`)
    return result[0];
}


function insertCampagne(name,idType_campagnes,content_text,content_media,date_creation,TypeContact,user_id,nombres_contacts, recu, non_recu) {
    return pool.query(
        'INSERT INTO pushs_campagnes SET name= ?,idType_campagnes= ?, content_text= ?, content_media= ?, date_creation= ?, idType_contact= ?, id_user= ?,nombres_contacts= ?, recu= ?, non_recu= ?',
        [name,idType_campagnes,content_text,content_media,date_creation,TypeContact,user_id,nombres_contacts, recu, non_recu]
    );
}
  


module.exports={getCampagne,getCampagneById,insertCampagne}