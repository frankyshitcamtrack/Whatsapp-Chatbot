const pool = require('../../config/db');


async function getUsers(){
   const result = await pool.query('SELECT * FROM Users INNER JOIN business_unit ON users.idDepartement=business_unit.id WHERE users.isDelete=0')
   return result[0]
}

async function getUserById(id){
    const result = await pool.query(`SELECT * FROM Users INNER JOIN business_unit ON users.idDepartement=business_unit.id WHERE users.isDelete=0 AND user_id=${id}`)
    return result[0]
 }


function insertUser(user_name,email,tel,departement,role,passWord) {
   return pool.query(
       'INSERT INTO Users SET user_name = ?, email = ?, tel = ?, idDepartement= ?, role= ?, password= ?',
       [user_name,email,tel,departement,role,passWord]
     );
 }
 
 async function updateUser(user_id,name,email,tel,departement,role,passWord) {
       return  await pool.query(
            'UPDATE Users SET user_name = ?, email = ?, tel = ?, idDepartement= ?, role= ?, password= ? WHERE user_id = ?',
            [name,email,tel,departement,role,passWord,user_id]
          );
 }

 function deleteUser(id){
   return pool.query(
        `UPDATE Users SET isDelete = 1 WHERE user_id=${id}`,
      );
}
 

module.exports={getUsers,getUserById,insertUser,updateUser,deleteUser}