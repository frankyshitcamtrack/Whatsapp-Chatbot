const pool = require('../../config/db');


async function getUsers(){
   const result = await pool.query('SELECT * FROM Users WHERE isDelete=0')
   return result[0]
}

async function getUserById(id){
    const result = await pool.query(`SELECT * FROM Users WHERE isDelete=0 AND id=${id}`)
    return result[0]
 }

function insertUser(name,email,tel,departement,role,passWord) {
   return pool.query(
       'INSERT INTO Users SET name = ?, email = ?, tel = ?, idDepartement= ?, idRole= ?, password= ?',
       [name,email,tel,departement,role,passWord]
     );
 }
 

 async function updateUser(id,name,email,tel,departement,role,passWord) {
       return  await pool.query(
            'UPDATE Users SET name = ?, email = ?, tel = ?, idDepartement= ?, idRole= ?, password= ? WHERE id = ?',
            [name,email,tel,departement,role,passWord,id]
          );
 }


 function deleteUser(id){
   return pool.query(
        `UPDATE Users SET isDelete = 1 WHERE id=${id}`,
      );
}
 

module.exports={getUsers,getUserById,insertUser,updateUser,deleteUser}