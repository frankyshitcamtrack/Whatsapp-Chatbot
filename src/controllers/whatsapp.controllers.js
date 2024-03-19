const { sendMessages, sendLocation } = require("../models/whatsapp.model");
const phoneFormat = require("../utils/fortmat-phone");
const dateInYyyyMmDdHhMmSs = require("../utils/dateFormat");
const { textMessageMenu1,scheduleMeeting, textMessage, textMessage3, askImmatriculation, getLocation, askDateMessage,getLocationByDate } = require("../data/template-massages")


let users = []

// Send vehicule location function
async function getPositionVehicule(immat,phoneId,phone,user){
   const location= await getLocation(immat)
   .then(res =>res.data )
   .catch(err => console.log(err));
   console.log(location);
   if(location && location.code<0){
      const message ={preview_url: false, body:`${location.status} \n Please enter a valid matricul number`};
      sendMessages(phoneId,phone,message);  
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
        let body =`*Vehicle* : ${immat}\n\n*Last known position* :  ${vehiculLocation.address}\n\n*Report time* : ${date}\n\n*Link* : ${link}`;
        let message = {preview_url: false, body:body}
        //sendLocation(phoneId,phone,vehiculLocation)
        sendMessages(phoneId, phone, message)
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
     sendMessages(phoneId, phone, message)
   } 
}


//Send vehicle location by specific date
async function getPositionVehicleByDate(user){
  console.log(user);
  const location= await getLocationByDate(user.date,user.vehicleNumber)
  .then(res =>res.data )
  .catch(err => console.log(err));
  if(location && location.code<0){
     const message ={preview_url: false, body:`${location.status}`};
     sendMessages(user.phoneId,user.phone,message);  
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
       let newDate = new Date(vehiculLocation.dates);
       let date = dateInYyyyMmDdHhMmSs(newDate);
       let link = `https://www.google.com/maps/place/${vehiculLocation.latitude}+${vehiculLocation.longitude}`;
       let body =`*Vehicle* : ${user.vehicleNumber}\n\nLast known position* :  ${vehiculLocation.address}\n\n*Report time* : ${date}\n\n*Link* : ${link}`;
       
       let message = {preview_url: false, body:body};

       sendMessages(user.phoneId, user.phone, message);

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
    sendMessages(user.phoneId,user.phone, message)
  } 
}

//Send whatsapp message
async function onSendMessages(req, res) {
  let entryID = req.body.entry[0].id;
  let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;// extract the phone numberId from the webhook payload
  let from = req.body.entry[0].changes[0].value.messages[0].from;  // extract the phone number text from the webhook payload
  let body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payloa
  let name = req.body.entry[0].changes[0].value.contacts[0].profile.name; // extract the name from the webhook payloa

  const findIndex = users.findIndex(item => item.name === name);
  const phone = phoneFormat(from);
  // Check the Incoming webhook message
  console.log(users);
  //console.log(JSON.stringify(req.body, null, 2));

  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
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
        sendMessages(phone_number_id, phone, textMessage.text);
        res.json(200);
      }

      if (findIndex >= 0) { // check if the user client index exist in the table user table
        const user = users[findIndex]; // find the user by his index
        user.body = body;
        switch(true){
          case (user.body === "1" && user.previewMessage === "" && user.flow===""):
            user.previewMessage = user.body;
            user.flow="1";
            sendMessages(user.phoneId, user.phone,textMessageMenu1.text);
            break;

          case (user.flow==="1" && user.previewMessage === "1" && user.body==="2"):
            sendMessages(user.phoneId,user.phone,askImmatriculation.text);
            user.previewMessage="2";
            user.matriculeQuestionSent=true;
            break;

          case (user.flow==="1" && user.previewMessage === "1" && user.body==="1" &&  user.matriculeQuestionSent===false):
            sendMessages(user.phoneId,user.phone,askImmatriculation.text);
            user.matriculeQuestionSent=true;
            user.previewMessage="1";
            break;

          case(user.flow==="1" && user.previewMessage === "1" && user.body!=="1" &&  user.matriculeQuestionSent===false):
            sendMessages(user.phoneId, user.phone,textMessageMenu1.text);
            break;

          case(user.flow==="1" && user.previewMessage === "1" && user.body!=="2" &&  user.matriculeQuestionSent===false ):
            sendMessages(user.phoneId, user.phone,textMessageMenu1.text);
            break;

          case (user.flow==="1" && user.previewMessage === "1" && user.matriculeQuestionSent===true && user.dateMessage===false):
            const formatMatricul = user.body.replace(/\s+/g,"");
            await getPositionVehicule(formatMatricul,user.phoneId,user.phone,user);
            break;

          case (user.flow==="1" && user.previewMessage === "1" && user.body==="2"):
            sendMessages(user.phoneId,user.phone,askImmatriculation.text);
            user.previewMessage="2";
            user.matriculeQuestionSent=true;
            break;

          case (user.flow==="1" && user.previewMessage === "2" && user.matriculeQuestionSent===true && user.dateMessage===false):
            let vehicleImmat = user.body
            user.vehicleNumber=vehicleImmat.replace(/\s+/g,"");
            sendMessages(user.phoneId,user.phone,askDateMessage.text);
            user.dateMessage=true;
            break;

          case (user.flow==="1" && user.previewMessage === "2" && user.dateMessage===true && user.matriculeQuestionSent===true):
            user.date=user.body;
            await getPositionVehicleByDate(user);
            break;

          case (user.body === "2" && user.previewMessage === "" && user.flow==="" && user.dateMessage===false && user.matriculeQuestionSent===false && user.scheduleMessageSent === false):
            user.previewMessage = user.body;
            sendMessages(user.phoneId, user.phone, textMessage3.text);
            user.scheduleMessageSent = true;
            break;

          case (user.previewMessage === "2" && user.scheduleMessageSent === true && user.flow==="" && user.dateMessage===false && user.matriculeQuestionSent===false):
            user.body = body
            const visit = scheduleMeeting(user.body, user.name);
            if (visit) {
              sendMessages(user.phoneId, user.phone, visit.text);
            }
            user.previewMessage = "";
            scheduleMessageSent = false;
            break;
            
          default:
            sendMessages(user.phoneId, user.phone, textMessage.text);
        }

     
        res.json(200);
       
      }
    }
    
  }
  else {
    res.sendStatus(404);
  }
}


function onVerification(req, res) {

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

module.exports = { onSendMessages, onVerification,getPositionVehicule }