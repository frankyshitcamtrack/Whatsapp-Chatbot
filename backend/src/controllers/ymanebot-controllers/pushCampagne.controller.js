const {getCampagne,getCampagneById,insertCampagne,getCampagneWithUserAndTypeCampaignExisting}=require('../../models/ymanebot-models/pushCampagne.model');
const {incrementNombrePush}=require('../../models/ymanebot-models/typeCampagne.model');
const {sendTemplateNotification,sendUtilityTemplateImage,sendTemplateMatketingVideo,sendTemplateVideo,sendTemplateMarketingImage}=require('../../models/whatsapp.model');
const { developement } = require("../../config/whatsappApi");
const {dateInYyyyMmDdHhMmSs}= require("../../utils/formatDate");
const {formatArrPhones}=require('../../utils/fortmat-phone');
const {listenWebhooks}=require('../../services/webhooklisterner.service')
const axios = require('axios');

const phonId= developement.phone_number_id;


async function WebHookListerer(req,res){
    try{
        console.log(res);
        console.log(req);
    }catch (error){
        console.error('error of: ', error);  // print the error to console
        return res.status(500).send('Post received, but we have an error!');
    }
}

async function sendSimpleMessage(number,message){
    const send = await sendTemplateNotification(phonId,number,message);
    if(send){
        console.log(send);
    }
}

async function sendImageMessage(number, message, link) {
  await sendTemplateMarketingImage(phonId,number,message,link)
   .then(res=>console.log(res))
}


async function sendVideoMessage(number,message,link){
    const send = await sendTemplateMatketingVideo(phonId,number,message,link)
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
    const fileName=file?file.filename:null;
    const fileType=file?file.mimetype:null;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;
    const formatPhones = formatArrPhones(contacts);
    const mediaPath =`${fullUrl}/assets/campaign/${fileName}`;
    const date = new Date();
    const date_creation = dateInYyyyMmDdHhMmSs(date);
    const user_id = 8;
 
    try {
        insertCampagne(name,+idTypeCampagnes,content_text,mediaPath,date_creation,+idType_contact,user_id,nombres_contacts, recu, non_recu);
        
       if(file && (fileType==='image/jpeg' || fileType==='image/png' || fileType==='image/jpg')){
        formatPhones.map(phone=>{
           sendImageMessage(phone,content_text,mediaPath)
         })
       }

       if(file && fileType==='video/mp4'){
        formatPhones.map(phone=>{
            sendVideoMessage(phone,content_text,mediaPath)
         })
       }

       if(!file){
        formatPhones.map(phone=>{
            sendSimpleMessage(phone,content_text)
         })
       }
       return res.status(201).json({
        ok:true
     });
 
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'something went wrong with the server'
        })
    }
}


async function httpGetPushCampagneWithExistUsersAndTC(req,res){
    try {
        return res.status(200).json(await getCampagneWithUserAndTypeCampaignExisting());
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            
            error: 'something went wrong with the server'
        })
    }
}


module.exports={httpGetPushCampagne,httpGetPushCampagneById,httpInsertPushCampagne,httpGetPushCampagneWithExistUsersAndTC,WebHookListerer}