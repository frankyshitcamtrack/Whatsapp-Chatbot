const pool = require('../../config/db');


async function getContacts(){
    const result =await pool.query('SELECT * FROM contact INNER JOIN type_contact ON contact.idType_contact=type_contact.id WHERE contact.isDelete=0');
    return result[0];
}


async function getContactById(id){
    const result = await pool.query(`SELECT * FROM Contact WHERE id=${id} AND isDelete=0`)
    return result[0];
}


function insertContact(id,tel,idType_contact,name,email,nameRef_contact,nbreFact_echu,mtn_due,salesadmin_name,salesadmin_tel,savadmin_name,savadmin_tel) {
    return pool.query(
        'REPLACE INTO contact SET id= ?, tel= ?, idType_contact= ?, name= ?, email= ?, nameRef_contact= ?, nbreFact_echu= ?, mtn_due= ?, salesadmin_name= ?, salesadmin_tel= ?, savadmin_name= ?, savadmin_tel= ?',
        [id,tel,idType_contact,name,email,nameRef_contact,nbreFact_echu,mtn_due,salesadmin_name,salesadmin_tel,savadmin_name,savadmin_tel]
    );
}


  


module.exports={getContacts,getContactById,insertContact}
