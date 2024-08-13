const pool = require('../../config/db');
const bcrypt=require('bcrypt');
const saltRounds = 10;

async function getUsers(){
   const result = await pool.query('SELECT * FROM users INNER JOIN business_unit ON users.idDepartement=business_unit.id WHERE users.isDelete=0')
   return result[0]
}

async function getUserById(id){
    const result = await pool.query(`SELECT * FROM users INNER JOIN business_unit ON users.idDepartement=business_unit.id WHERE users.isDelete=0 AND user_id=${id}`)
    return result[0]
 }

 async function getUserByEmail(email){
  const result = await pool.query('SELECT * FROM users INNER JOIN business_unit ON users.idDepartement=business_unit.id WHERE users.isDelete=0 AND users.email= ?',[email])
  return result[0]
}



function insertUser(user_name,email,tel,departement,role,passWord) {
  try{
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
          console.log(err)
          return;
      }
    bcrypt.hash(passWord,salt,(err,hash)=>{
        if(err){
          console.log(err)
          return err;
        }
   pool.query(
          'INSERT INTO users SET user_name = ?, email = ?, tel = ?, idDepartement= ?, role= ?, password= ?',
          [user_name,email,tel,departement,role,hash]
        );
        
       })
      
      //Salt generation successful, proceed to hash the password
    });
  }catch(err){
     console.log(err)
  }

  
}
 
 async function updateUser(user_id,name,email,tel,departement,role,passWord) {
       return  await pool.query(
            'UPDATE users SET user_name = ?, email = ?, tel = ?, idDepartement= ?, role= ?, password= ? WHERE user_id = ?',
            [name,email,tel,departement,role,passWord,user_id]
          );
 }

 function deleteUser(id){
   return pool.query(
        `UPDATE users SET isDelete = 1 WHERE user_id=${id}`,
      );
}
 

module.exports={getUsers,getUserById,insertUser,updateUser,deleteUser,getUserByEmail}