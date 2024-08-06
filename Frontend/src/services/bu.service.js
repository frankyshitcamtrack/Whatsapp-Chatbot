const baseUrl="http://localhost:8000/api/ymanebot"

//for production
//const baseUrl="api/ymanebot" 


async function getBu(){
  const res = await fetch(`${baseUrl}/business_unit`);
  const data = await res.json();
  return data;
}


async function getBuById(id){
    const res = await fetch(`${baseUrl}/business_unit/${id}`);
    const data =await res.json();
    return data;
  }

async function addBu(bu){
  try{
    return await fetch(`${baseUrl}/business_unit`,{
        headers:{
          "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify(bu)
    })
  }catch(error){
    console.log(error);
    return error
  }
}


async function updateBu(bu){
    try{
      return await fetch(`${baseUrl}/update-business_unit`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(bu)
      })
    }catch(error){
      console.log(error);
      return error
   }
}

async function deleteBu(bu){
    try{
      return await fetch(`${baseUrl}/delete-business_unit`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(bu)
      })
    }catch(error){
      console.log(error);
      return error
   }
}


export{
    getBu,
    getBuById,
    addBu,
    updateBu,
    deleteBu
}
  
  

