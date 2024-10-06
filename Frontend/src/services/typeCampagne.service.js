import baseUrl from "../config";
import axios from "axios";

async function getTypeCampagne(){
  try{
    const res = await axios.get(`${baseUrl}/type_campagne`);
    const data = await res.data;
    return data;
  }catch(error){
    console.log(error)
  } 

}


async function getTypeampagneById(id) {
  try {
    const res = await axios.get(`${baseUrl}/single-type_campagne/${id}`);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error)
  }
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
  

