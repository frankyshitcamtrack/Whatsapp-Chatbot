const baseUrl="http://localhost:8000/api/ymanebot"

//for production
//const baseUrl="/api/ymanebot" 


async function getRoles(){
  const res = await fetch(`${baseUrl}/get-roles`);
  const data =await res.json();
  return data;
}


async function addRole(role){
  try{
    return await fetch(`${baseUrl}/add-role`,{
        headers:{
          "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify(role)
    })
  }catch(error){
    console.log(error);
    return error
  }
}


async function updateRole(role){
    try{
      return await fetch(`${baseUrl}/update-role`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(role)
      })
    }catch(error){
      console.log(error);
      return error
   }
}

async function deleteRole(role){
    try{
      return await fetch(`${baseUrl}/delete-role`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(role)
      })
    }catch(error){
      console.log(error);
      return error
   }
}


export{
    getRoles,
    addRole,
    updateRole,
    deleteRole
}
  
  

