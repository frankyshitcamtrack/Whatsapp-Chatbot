const baseUrl="http://localhost:8000/api/ymanebot"

//for production
//const baseUrl="api/ymanebot" 

async function getTypesContacts(){
  const res = await fetch(`${baseUrl}/types-contacts`);
  const data= await res.json();
  return data;
}


async function getTypeContactById(id){
    const res = await fetch(`${baseUrl}/single-type_contact/${id}`);
    const data =await res.json();
    return data;
}



async function getTypeContactByName(name){
    const res = await fetch(`${baseUrl}/single-type_contact-by_name/${name}`);
    const data =await res.json();
    return data;
}



async function addTypeContact(typeContact){
  try{
    return await fetch(`${baseUrl}/add-type_contact`,{
        headers:{
          "Content-Type":"application/json"
        },
        method:"post",
        body:JSON.stringify(typeContact)
    })
  }catch(error){
    console.log(error);
    return error
  }
}


async function updateContact(typeContact){
    try{
      return await fetch(`${baseUrl}/update-type_contact`,{
          headers:{
            "Content-Type":"application/json"
          },
          method:"post",
          body:JSON.stringify(typeContact)
       })
    }catch(error){
      console.log(error);
      return error
   }
} 


async function deleteContact(typeContact){
    try{
      return await fetch(`${baseUrl}/delete-type_contact`,{
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


export {
    getTypesContacts,
    getTypeContactById,
    getTypeContactByName,
    addTypeContact,
    updateContact,
    deleteContact
}
  

