const pool = require('../../config/db');


async function getDiscussions(){
    const result =await pool.query('SELECT * FROM discussions INNER JOIN pushs_campagnes ON discussions.id_push_campaign=pushs_campagnes.id WHERE discussions.isDelete=0');
    return result[0];
}


async function getDiscussionById(id){
    const result = await pool.query(`SELECT * FROM discussions WHERE id_discussion=${id} AND isDelete=0`);
    return result[0];
}



function insertDiscussion(id_discussion,message,numero,status,id_push_campaign) {
    return pool.query(
        'REPLACE INTO discussions SET id_discussion= ?, message= ?, numero= ?, status= ?, id_push_campaign= ?',
        [id_discussion,message,numero,status,id_push_campaign]
    );
}



module.exports ={getDiscussions,getDiscussionById,insertDiscussion}


