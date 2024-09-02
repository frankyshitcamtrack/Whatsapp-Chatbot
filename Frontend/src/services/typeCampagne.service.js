import baseUrl from "../config";

async function getTypeCampagne(){
  const res = await fetch(`${baseUrl}/type_campagne`);
  const data = await res.json();
  return data;
}


async function getTypeampagneById(id){
    const res = await fetch(`${baseUrl}/single-type_campagne/${id}`);
    const data = await res.json();
    return data;
  }


async function addTypeCampagne(typeCampagne){
  try{
    return await fetch(`${baseUrl}/type_campagne`,{
        headers:{
          "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify(typeCampagne)
    })
  }catch(error){
    console.log(error);
    return error
  }
}


async function updateTypeCampagne(typeCampagne){
    try{
      return await fetch(`${baseUrl}/update-type_campagne`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(typeCampagne)
      })
    }catch(error){
      console.log(error);
      return error
   }
}



async function deleteTypeCampagne(typeCampagne){
    try{
      return await fetch(`${baseUrl}/delete-type_campagne`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(typeCampagne)
      })
    }catch(error){
      console.log(error);
      return error
   }
}
  

export {
    getTypeCampagne,
    getTypeampagneById,
    addTypeCampagne,
    updateTypeCampagne,
    deleteTypeCampagne
}
  

