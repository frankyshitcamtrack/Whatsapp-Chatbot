const baseUrl="http://localhost:8000/api/ymanebot"

//for production
//const baseUrl="/api/ymanebot" 

async function getAllUsers(){
  const res = await fetch(`${baseUrl}/users`);
  const data = await res.json();
  return data;
}


async function getUserbyId(id){
    const res = await fetch(`${baseUrl}/single-user/${id}`);
    const data =await res.json();
    return data;
}


async function addUser(user){
  try{
    return await fetch(`${baseUrl}/add-user`,{
        headers:{
          "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify(user)
    })
  }catch(error){
    console.log(error);
    return error
  }
}


async function updateUser(user){
    try{
      return await fetch(`${baseUrl}/update-user`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(user)
      })
    }catch(error){
      console.log(error);
      return error
   }
}

async function deleteUser(user){
    try{
      return await fetch(`${baseUrl}/delete-user`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(user)
      })
    }catch(error){
      console.log(error);
      return error
   }
}
  

async function login(credentials){
  try{
    return await fetch(`${baseUrl}/login`,{
        headers:{
          "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify(credentials)
    })
  }catch(error){
    console.log(error);
    return error
  }
}

export {
    getAllUsers,
    getUserbyId,
    addUser,
    updateUser,
    deleteUser,
    login
}
  

