const path = require('path');
const { sendMessages, sendMediaAudio,sendMediaDocument,sendMediaImage,sendMediaVideo,sendAudiobyId,sendDocbyId,sendVidbyId,sendMessageList,sendUtilityTemplateImage,sendTemplateVideo,sendTemplateNotification,sendTemplateImageMultiple,sendTemplateNotificationMultiple,sendTemplateVideoMultiple } = require("../models/whatsapp.model");
const {phoneFormat,formatArrPhones} = require("../utils/fortmat-phone");
const dateInYyyyMmDdHhMmSs = require("../utils/dateFormat");
const {notification, textMessageMenu1,scheduleMeeting, textMessage, textMessage3, askImmatriculation, getLocation, askDateMessage,getLocationByDate } = require("../data/template-massages");
const { developement } = require("../config/whatsappApi");
const {downloadVideo}=require("../utils/download");
const {downloadImage}=require('../utils/downloadImg')
const {v4 : uuidv4} = require('uuid');


let users = []

// Send vehicule location function
async function getPositionVehicule(user){
   const location= await getLocation(user.vehicleNumber)
   .then(res =>res.data )
   .catch(err => console.log(err));
   console.log(location);
   if(location && location.code<0){
      const message ={preview_url: false, body:`${location.status} \n Please enter a valid matricul number`};
      await sendMessages(user.phoneId,user.phone,message);  
      user.previewMessage = "1"
      user.flow="1"
   }

   else if(location && location.code>0){
    let vehiculLocation = {
       "address": location.lastposition,
       "latitude": location.lats,
       "longitude":location.longs ,
       "name":`${location.lats},${location.longs}`,
       "dates":location.dates
     }
     if(vehiculLocation.latitude && vehiculLocation.longitude){
        let repportDate =new Date(vehiculLocation.dates);
        let date = dateInYyyyMmDdHhMmSs(repportDate);
        let link = `https://www.google.com/maps/place/${vehiculLocation.latitude}+${vehiculLocation.longitude}`;
        let body =`*Vehicle* : ${user.vehicleNumber}\n\n*Last known position* :  ${vehiculLocation.address}\n\n*Report time* : ${date}\n\n*Link* : ${link}`;
        let message = {preview_url: false, body:body}
        //sendLocation(phoneId,phone,vehiculLocation)
      await sendMessages(user.phoneId,user.phone,message); 
        user.previewMessage = "";
        user.flow="";
        user.vehicleNumber = "";
        user.dates="";
        user.scheduleMessageSent= false;
        user.matriculeQuestionSent=false;
        user.dateMessage=false;
     } 
   }
  else{
     const message ={preview_url: false, body:"une Erreur est subvenu avec notre serveur bien vouloir patienter quelque minutes et essayer"}
     await sendMessages(user.phoneId,user.phone,message); 
   } 
}


//Send vehicle location by specific date
async function getPositionVehicleByDate(user){
   const location= await getLocationByDate(user.date,user.vehicleNumber)
  .then(res =>res.data )
  .catch(err => console.log(err));
  if(location && location.code<0){
     const message ={preview_url: false, body:`${location.status}`};
    await sendMessages(user.phoneId,user.phone,message);  
       user.previewMessage = "";
       user.flow="";
       user.vehicleNumber = "";
       user.dates="";
       user.scheduleMessageSent= false;
       user.matriculeQuestionSent=false;
       user.dateMessage=false;
  }

  else if(location && location.code>0){
   let vehiculLocation = {
      "address": location.lastposition,
      "latitude": location.lats,
      "longitude":location.longs ,
      "name":`${location.lats},${location.longs}`,
      "dates":location.dates
    }
    if(vehiculLocation.latitude && vehiculLocation.longitude){
       let newDate = new Date(vehiculLocation.dates);
       let date = dateInYyyyMmDdHhMmSs(newDate);
       let link = `https://www.google.com/maps/place/${vehiculLocation.latitude}+${vehiculLocation.longitude}`;
       let body =`*Vehicle* : ${user.vehicleNumber}\n\n*Last known position* :  ${vehiculLocation.address}\n\n*Report time* : ${date}\n\n*Link* : ${link}`;
       
       let message = {preview_url: false, body:body};

      await sendMessages(user.phoneId, user.phone, message);

       user.previewMessage = "";
       user.flow="";
       user.vehicleNumber = "";
       user.dates="";
       user.scheduleMessageSent= false;
       user.matriculeQuestionSent=false;
       user.dateMessage=false;
    } 
  }
 else{
    const message ={preview_url: false, body:"une Erreur est subvenu avec notre serveur bien vouloir patienter quelque minutes et essayer"}
    await sendMessages(user.phoneId,user.phone, message)
  } 
}

//Send whatsapp message
async function onSendMessages(req, res) {
  try{
    if (req.body.object && req.body.entry && req.body.entry[0].changes && req.body.entry[0].changes[0].value && req.body.entry[0].changes[0].value.messages && req.body.entry[0].changes[0].value.contacts) {
        let entryID = req.body.entry[0].id;
        let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;// extract the phone numberId from the webhook payload
        let from = req.body.entry[0].changes[0].value.messages[0].from;  // extract the phone number text from the webhook payload
        let body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payloa
        let name = req.body.entry[0].changes[0].value.contacts[0].profile.name; // extract the name from the webhook payloa
  
        const findIndex = users.findIndex(item => item.name === name);
        const phone = phoneFormat(from);
        // Check the Incoming webhook message
        console.log(JSON.stringify(req.body, null, 2));
        console.log(users);
        
      
        // check if the user client index is not exist in the table user table and finally add the new user
        if (findIndex < 0) {
          const newUser = {
            'id': entryID,
            'name': name,
            'phone': phone,
            'phoneId': phone_number_id,
            'body': body,
            'vehicleNumber':'',
            'date':'',
            'time':'',
            'flow':"",
            'previewMessage': "",
            'scheduleMessageSent': false,
            'matriculeQuestionSent':false,
            'dateMessage':false,
          }
          users.push(newUser);
          await sendMessages(phone_number_id, phone, textMessage.text);
        }
  
        if (findIndex >= 0) { // check if the user client index exist in the table user table
          const user = users[findIndex]; // find the user by his index
          user.body = body;
          switch(true){
  
            case (user.body === "1" && user.previewMessage === "" && user.flow===""):{
              user.previewMessage = user.body;
              user.flow="1";
              await sendMessages(user.phoneId, user.phone,textMessageMenu1.text);
              break;
            }
  
            case(user.body==="3" && user.previewMessage === "" && user.flow===""):{
             await sendAudiobyId(user.phoneId,user.phone,"857694462782371");
              break;
            }
  
            case(user.body==="4" && user.previewMessage === "" && user.flow===""):{
             await sendVidbyId(user.phoneId,user.phone,"716903793964115");
              break;
            }
  
            case(user.body==="5" && user.previewMessage === "" && user.flow===""):{
              await sendDocbyId(user.phoneId,user.phone,"385059230949332");
              break; 
            }
  
            case(user.body==="6" && user.previewMessage === "" && user.flow===""):{
              await sendMessageList(user.phoneId,user.phone);
              break; 
            }
  
            case (user.flow==="1" && user.previewMessage === "1" && user.body==="2"):{
            await  sendMessages(user.phoneId,user.phone,askImmatriculation.text);
              user.previewMessage="2";
              user.matriculeQuestionSent=true;
              break;
            }
  
            case (user.flow==="1" && user.previewMessage === "1" && user.body==="1" &&  user.matriculeQuestionSent===false):{
             await sendMessages(user.phoneId,user.phone,askImmatriculation.text);
              user.matriculeQuestionSent=true;
              user.previewMessage="1";
              break;
            }
  
            case(user.flow==="1" && user.previewMessage === "1" && user.body!=="1" &&  user.matriculeQuestionSent===false):{
             await sendMessages(user.phoneId, user.phone,textMessageMenu1.text);
              break;
            }
  
            case(user.flow==="1" && user.previewMessage === "1" && user.body!=="2" &&  user.matriculeQuestionSent===false ):{
             await sendMessages(user.phoneId, user.phone,textMessageMenu1.text);
              break;
            }
  
            case (user.flow==="1" && user.previewMessage === "1" && user.matriculeQuestionSent===true && user.dateMessage===false):{
              user.vehicleNumber = user.body.replace(/\s+/g,"");
              await getPositionVehicule(user);
              break;
            }
  
            case (user.flow==="1" && user.previewMessage === "2" && user.matriculeQuestionSent===true && user.dateMessage===false):{
              let vehicleImmat = user.body
              user.vehicleNumber=vehicleImmat.replace(/\s+/g,"");
             await sendMessages(user.phoneId,user.phone,askDateMessage.text);
              user.dateMessage=true;
              break;
            }
  
            case (user.flow==="1" && user.previewMessage === "2" && user.dateMessage===true && user.matriculeQuestionSent===true):{
              user.date=user.body;
              await getPositionVehicleByDate(user);
  
              break;
            }
  
            case (user.body === "2" && user.previewMessage === "" && user.flow==="" && user.dateMessage===false && user.matriculeQuestionSent===false && user.scheduleMessageSent === false):{
              user.previewMessage = user.body;
             await sendMessages(user.phoneId, user.phone, textMessage3.text);
              user.scheduleMessageSent = true;
              break;
            }
  
            case (user.previewMessage === "2" && user.scheduleMessageSent === true && user.flow==="" && user.dateMessage===false && user.matriculeQuestionSent===false):{
              user.body = body
              const visit = scheduleMeeting(user.body, user.name);
             await sendMessages(user.phoneId, user.phone, visit.text);
              user.previewMessage = "";
              user.scheduleMessageSent = false;
              break;
            }
  
            default:
             await sendMessages(user.phoneId, user.phone, textMessage.text);
          }
         
        }
        
      
      
      res.json(200);
    }
    else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);                                                         // print the error to console
    return res.status(500).send('Post received, but we have an error!');
  }

}


async function onVerification(req, res) {

  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
  **/
  const verify_token = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
}


async function onSendNotification(req, res) {
  try {
    const phoneID = developement.phone_number_id
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;

    if (phoneID && phone && message) {
      const alert = notification(message);
      if (alert) {
        await sendMessages(phoneID, phone, alert.text);
        res.json(200);
      }
    } else {
      res.sendStatus(404);
    }

  }
  catch (error) {
    console.error('error of: ', error);                                                         // print the error to console
    return res.status(500).send('Post received, but we have an error!');
  }


}


async function onSendEvidence(req, res) {
  try {
    const phoneID = developement.phone_number_id
    const phone = phoneFormat(req.body.phone);
    const media = req.body.link;
    if (phoneID && phone && media) {
      await sendMediaVideo(phoneID, phone, media);
      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);                                                         // print the error to console
    return res.status(500).send('Post received, but we have an error!');
  }

}


async function onSendImage(req, res) {
  try {
    const phoneID = developement.phone_number_id
    const phone = phoneFormat(req.body.phone);
    const media = req.body.link;
    if (phoneID && phone && media) {
      await sendMediaImage(phoneID, phone, media);
      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);                                                         // print the error to console
    return res.status(500).send('Post received, but we have an error!');
  }


}

async function onSendTemplateImage(req, res) {
  try {
    const phoneID = developement.phone_number_id
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;
    const img = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;
    const downloadImId = uuidv4();
    const downloadPath = `public/assets/evidence/${downloadImId}.jpg`;
    const media = await downloadImage(img,downloadPath,fullUrl);
    if (phoneID && phone && media) {
      console.log(media)
      setTimeout(async()=>{
        await sendUtilityTemplateImage(phoneID, phone, message, media)
        res.json(200);
      },10000)
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);                                                  
    return res.status(500).send('Post received, but we have an error!');
  }
}


async function onSendTemplateNotification(req, res) {
  try {
    const phoneID = developement.phone_number_id
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;
    if (phoneID && phone && message ) {
     await sendTemplateNotification(phoneID, phone, message)
     res.send(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);                                                    
    return res.status(500).send('Post received, but we have an error!');
  }
}


async function onSendTemplateVideo(req, res) {
  try {
    const phoneID = developement.phone_number_id
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;
    const url = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;
    const downloadVidId = uuidv4();
    const downloadPath = path.resolve(`public/assets/video/${downloadVidId}.mp4`);
    const video = await downloadVideo(url, downloadPath, fullUrl);
    if (phoneID && phone && video) {
      setTimeout(async () => {
        await sendTemplateVideo(phoneID, phone, message, video);
        res.send(200)
      }, 15000)
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);
    return res.status(500).send('Post received, but we have an error!');
  }
}



async function onSendTemplateVideoMultiple(req,res){
  try {
    const phoneID = developement.phone_number_id
    const phoneArr= JSON.parse(req.body.phones.replace(/'/g, '"'));
    const phones = formatArrPhones(phoneArr);

    const message = req.body.message;

    const url = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;

    const downloadVidId = uuidv4();
    const downloadPath = path.resolve(`public/assets/video/${downloadVidId}.mp4`);

    const video = await downloadVideo(url, downloadPath, fullUrl);

    if (phoneID && phones && video) {
      setTimeout(async () => {
        await sendTemplateVideoMultiple(phoneID, phones, message, video);
        res.send(200)
      }, 15000)
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);
    return res.status(500).send('Post received, but we have an error!');
  }
}


async function onSendTemplateNotificationMultiple(req,res){
  try {
    const phoneID = developement.phone_number_id
    const phoneArr= JSON.parse(req.body.phones.replace(/'/g, '"'));
    const phones = formatArrPhones(phoneArr);
    const message = req.body.message;
    if (phoneID && phones && message ) {
     await sendTemplateNotificationMultiple(phoneID,phones,message)
     res.send(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);                                                    
    return res.status(500).send('Post received, but we have an error!');
  }
}


async function onSendTemplateImageMultiple(req,res){
  try {
    const phoneID = developement.phone_number_id

    const phoneArr= JSON.parse(req.body.phones.replace(/'/g, '"'));
    const phones = formatArrPhones(phoneArr);

    const message = req.body.message;

    const img = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;

    const downloadImId = uuidv4();
    const downloadPath = `public/assets/evidence/${downloadImId}.jpg`;

    const media = await downloadImage(img,downloadPath,fullUrl);

    if (phoneID && phones && media) {
      console.log(media)
      setTimeout(async()=>{
        await sendTemplateImageMultiple(phoneID, phones, message, media)
        res.json(200);
      },10000)
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);                                                  
    return res.status(500).send('Post received, but we have an error!');
  }
}


module.exports = { 
  onSendMessages, 
  onVerification,
  getPositionVehicule,
  onSendNotification,
  onSendEvidence,
  onSendImage,
  onSendTemplateImage,
  onSendTemplateVideo,
  onSendTemplateNotification,
  onSendTemplateVideoMultiple,
  onSendTemplateNotificationMultiple,
  onSendTemplateImageMultiple
}