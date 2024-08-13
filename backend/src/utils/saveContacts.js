const {getContacts}=require('../services/googlesheet.service');
const {insertContact}=require('../models/ymanebot-models/contact.model');
const {getTypeContactByName}=require('../models/ymanebot-models/typeContact.model');

async function getIdByName(name){
    const val =await getTypeContactByName(name);
    if(val.length>0){
        return val[0].id;
    }
    
}

async function SaveContact(){ 
   try{
     const getContact= await getContacts();
     if(getContact.length>0){
        const updateContacts = await Promise.all(getContact.map(async (item)=>{
            const typeClientId = await getIdByName(item['Type de client']); 
            if(typeClientId){
                return {
                    ...item,
                    'Type de client': typeClientId
                }
            }
         
         })
         )  

         if(updateContacts.length>0){
            updateContacts.map(item=>(
                insertContact(
                    item.idclient,
                    item['N°tel contact principal'],
                    item['Type de client'],
                    item['nom contact principal'],
                    item['emai de contact'],
                    item['nameRef_contact'],
                    item['nbreFact_echu'],
                    item['mtn_due'],
                    item['Nom sales'],
                    item['Telephone Sales'],
                    item['savadmin_name'],
                    item['savadmin_tel']
                )
            ))
         }

         console.log('Contacts added successfully');
     }
   }catch(error){
     console.log(error);
   }
}


module.exports={SaveContact}