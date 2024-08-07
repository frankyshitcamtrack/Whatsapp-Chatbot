const {getCampagne,getCampagneById,insertCampagne}=require('../../models/ymanebot-models/pushCampagne.model');
const {sendTemplateNotification,sendUtilityTemplateImage,sendTemplateVideo}=require('../../models/whatsapp.model');
const { developement } = require("../../config/whatsappApi");
const {dateInYyyyMmDdHhMmSs}= require("../../utils/formatDate");
const {formatArrPhones}=require('../../utils/fortmat-phone')

const phoneID = developement.phone_number_id;


async function sendSimpleMessage(number,message){
   const send= await sendTemplateNotification(phoneID,number,message)
   if(send){
    console.log(send);
   }
}

async function sendImageMessage(number,message,link){
    const send= await sendUtilityTemplateImage(phoneID,number,message,link)
   if(send){
    console.log(send);
   }
}

async function sendImageVideo(number,message,link){
    const send= await sendTemplateVideo(phoneID,number,message,link)
   if(send){
    console.log(send);
   }
}

async function httpGetPushCampagne(req,res){
    try {
        return res.status(200).json(await getCampagne());
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            
            error: 'something went wrong with the server'
        })
    }
}

async function httpGetPushCampagneById(req,res){
    const id = +req.params.id;
    try {
        return res.status(200).json(await getCampagneById(id));
    } catch (error) {
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpInsertPushCampagne(req,res){

    const {name,contacts,idTypeCampagnes,content_text,content_media,idType_contact,nombres_contacts, recu,non_recu} = req.body;
    const file = req.file;
    const fileName=file.filename;
    const fileType=file.mimetype;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;
    const formatPhones = formatArrPhones(contacts);
    const mediaPath =`${fullUrl}/assets/campaign/${fileName}`;

    console.log(file);
    console.log(mediaPath);

    const date = new Date();
    const date_creation = dateInYyyyMmDdHhMmSs(date);
    const user_id = 8;
 
    try {

       if(file && fileType==='image/jpeg'){
        formatPhones.map(phone=>{
           sendImageMessage(phone,content_text,mediaPath)
         })
       }

       if(file && fileType==='video/mp4'){
        formatPhones.map(phone=>{
            sendImageMessage(phone,content_text,mediaPath)
         })
       }

       if(!file){
        formatPhones.map(phone=>{
            sendSimpleMessage(phone,content_text)
         })
       }

       const insert= await insertCampagne(name,+idTypeCampagnes,content_text,mediaPath,date_creation,+idType_contact,user_id,nombres_contacts, recu, non_recu);
       
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


module.exports={httpGetPushCampagne,httpGetPushCampagneById,httpInsertPushCampagne}