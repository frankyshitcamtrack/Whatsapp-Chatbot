const pool = require('../../config/db');


async function getCampagne(){
    const result = await pool.query(`SELECT * FROM pushs_campagnes INNER JOIN users ON pushs_campagnes.id_user=users.user_id
                                                                   INNER JOIN types_campagnes ON pushs_campagnes.idType_campagnes=types_campagnes.id
                                                                   INNER JOIN type_contact ON pushs_campagnes.idType_contact=type_contact.id 
                                                                   WHERE pushs_campagnes.isDelete=0  ORDER BY date_creation desc` 
                                                                );
    return result[0];
}

async function getCampagneWithUserAndTypeCampaignExisting(){
    const result = await pool.query(`SELECT * FROM pushs_campagnes INNER JOIN users ON pushs_campagnes.id_user=users.user_id
        INNER JOIN types_campagnes ON pushs_campagnes.idType_campagnes=types_campagnes.id
        WHERE pushs_campagnes.isDelete=0 AND types_campagnes.isDelete=0 AND users.isDelete=0` 
     );
    return result[0];
}

async function getCampagneById(id){
    const result = await pool.query(`SELECT * FROM pushs_campagnes INNER JOIN users ON pushs_campagnes.id_user=users.user_id WHERE pushs_campagnes.id=${id} AND pushs_campagnes.isDelete=0`)
    return result[0];
}


async function insertCampagne(name,idType_campagnes,content_text,content_media,date_creation,TypeContact,user_id,nombres_contacts, recu, non_recu) {
    try{
        pool.query(
            'INSERT INTO pushs_campagnes SET push_campagne_name= ?,idType_campagnes= ?, content_text= ?, content_media= ?, date_creation= ?, idType_contact= ?, id_user= ?,nombres_contacts= ?, recu= ?, non_recu= ?',
            [name,idType_campagnes,content_text,content_media,date_creation,TypeContact,user_id,nombres_contacts, recu, non_recu]
        );
        const res = await pool.query(`SELECT id FROM pushs_campagnes WHERE isDelete=0 ORDER BY id desc LIMIT 1`);
        return res[0];
    }catch(error){
      console.log(error);
    }
  
}
  


module.exports={getCampagne,getCampagneById,insertCampagne,getCampagneWithUserAndTypeCampaignExisting}