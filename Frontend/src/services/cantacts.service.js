import baseUrl from "../config" ;

async function getContacts(){
  const res = await fetch(`${baseUrl}/contacts`);
  const data =await res.json();
  return data;
}


async function getContactById(id){
    const res = await fetch(`${baseUrl}/single-contact/${id}`);
    const data =await res.json();
    return data;
  }


async function addContact(contact){
  try{
    return await fetch(`${baseUrl}/add-contact`,{
        headers:{
          "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify(contact)
    })
  }catch(error){
    console.log(error);
    return error
  }
}


/* async function updateContact(contact){
    try{
      return await fetch(`${baseUrl}/update-type_campagne`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(contact)
      })
    }catch(error){
      console.log(error);
      return error
   }
} */


/* 
async function deleteContact(contact){
    try{
      return await fetch(`${baseUrl}/delete-type_campagne`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(contact)
      })
    }catch(error){
      console.log(error);
      return error
   }
}
   */

export {
    getContacts,
    getContactById,
    addContact

}
  

