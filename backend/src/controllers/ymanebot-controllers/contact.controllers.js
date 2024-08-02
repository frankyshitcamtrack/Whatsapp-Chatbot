const {getContacts,getContactById,insertContact}=require('../../models/ymanebot-models/contact.model');



async function httpGetContacts(req,res){
    try {
        return res.status(200).json(await getContacts());
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}

async function httpGetContactById(req,res){
   const id = req.body.id;
    try {
        return res.status(200).json(await getContactById(id));
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpInsertContact(req,res){
    const {id,tel,idType_contact,name,email,nameRef_contact,nbreFact_echu,mtn_due,salesadmin_name,salesadmin_tel,savadmin_name,savadmin_tel} = req.body;
    try {
       const insert= await insertContact(id,tel,idType_contact,name,email,nameRef_contact,nbreFact_echu,mtn_due,salesadmin_name,salesadmin_tel,savadmin_name,savadmin_tel);
       if(insert){
        return res.status(201).json(insert);
       }
       
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


module.exports={httpGetContacts,httpGetContactById,httpInsertContact}