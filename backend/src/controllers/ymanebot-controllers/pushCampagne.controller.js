const {getCampagne,getCampagneById,insertCampagne,getCampagneWithUserAndTypeCampaignExisting}=require('../../models/ymanebot-models/pushCampagne.model');
const {sendTemplateMarketingImage,sendTemplateMatketingVideo,sendTemplateNotification}=require('../../models/ymanebot-models/ymane.model');
const {insertDiscussion,updateStatusDiscussion, getDiscussionById}=require('../../models/ymanebot-models/discussions.model');
const { developement } = require("../../config/whatsappApi");
const {dateInYyyyMmDdHhMmSs}= require("../../utils/formatDate");
const {formatArrPhones}=require('../../utils/fortmat-phone');

const phonId= developement.phone_number_id;


async function WebHookListerer(req, res) {
    try {
        if (req.body.entry[0].changes[0].value.statuses[0].errors) {
            console.log(req.body.entry[0].changes[0].value.statuses[0].errors[0]);
            console.log(req.body.entry[0].changes[0].value.statuses[0].errors[0].error_data);
        } else {
            console.log('-----------------value.statuses--------------')
            const statuses = req.body.entry[0].changes[0].value.statuses[0];
            const id = statuses.id;
            const state = statuses.status;
            const path =req.url;
            const singleDiscussion= await getDiscussionById(`"${id}"`);
          if(singleDiscussion.length>0 && singleDiscussion[0].id_discussion===id && state!=='accepted' && path==="/bulk_webhook"){
                console.log(singleDiscussion)
                updateStatusDiscussion(id,state);
           } 
        }
    } catch (error) {
        console.error('error of: ', error);  // print the error to console
        return res.status(500).send('Post received, but we have an error!');
    }
}


async function sendSimpleMessage(number,message,idPush){
   await sendTemplateNotification(phonId,number,message)
    .then((res)=>{
        const data = res.data;
        const id_discussion= data.messages[0].id;
        const numero=data.contacts[0].input;
        const status=data.messages[0].message_status;
        const idP=idPush;
        console.log(data);
        if(status==='accepted'){
            insertDiscussion(id_discussion,numero,status,idP)
         }
       }
    )
}


async function sendImageMessage(number, message, link,idPush) {
  await sendTemplateMarketingImage(phonId,number,message,link)
   .then((res)=>{
    const data = res.data;
    const id_discussion= data.messages[0].id;
    const numero=data.contacts[0].input;
    const status=data.messages[0].message_status;
    const idP=idPush
    console.log(data);
    if(status==='accepted'){
        insertDiscussion(id_discussion,numero,status,idP)
     }  
   }
)
}


async function sendVideoMessage(number,message,link,idPush){
    await sendTemplateMatketingVideo(phonId,number,message,link)
    .then((res)=>{
        const data = res.data;
        const id_discussion= data.messages[0].id;
        const numero=data.contacts[0].input;
        const status=data.messages[0].message_status;
        const idP=idPush;
        console.log(data);
        if(status==='accepted'){
           insertDiscussion(id_discussion,numero,status,idP)
        }
       }
    )
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
    const {name,contacts,idTypeCampagnes,content_text,content_media,idType_contact,nombres_contacts,id_user} = req.body;
    const file = req.file;
    const fileName=file?file.filename:null;
    const fileType=file?file.mimetype:null;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;
    const formatPhones = formatArrPhones(contacts);

    const mediaPath =`${fullUrl}/assets/campaign/${fileName}`;
    console.log(mediaPath);
    const date = new Date();
    const date_creation = dateInYyyyMmDdHhMmSs(date);
    
    try {
        await insertCampagne(name,+idTypeCampagnes,content_text,mediaPath,date_creation,+idType_contact,+id_user,nombres_contacts).then((re)=>{
            if(re.length>0){
                const idPushCampaigm = re[0].id;
                if(file && (fileType==='image/jpeg' || fileType==='image/png' || fileType==='image/jpg')){
                    formatPhones.map(phone=>{
                       sendImageMessage(phone,content_text,mediaPath,idPushCampaigm)
                     })
                   }
            
                   if(file && fileType==='video/mp4'){
                    formatPhones.map(phone=>{
                        sendVideoMessage(phone,content_text,mediaPath,idPushCampaigm)
                     })
                   }
            
                   if(!file){
                    formatPhones.map(phone=>{
                        sendSimpleMessage(phone,content_text,idPushCampaigm)
                     })
                   }
                return res.status(201).json({ok:true});
            } 
        })

    } catch (error) {
        console.log(error)
        return res.status(500);
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