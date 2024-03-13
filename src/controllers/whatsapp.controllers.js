const { sendMessages, sendLocation } = require("../models/whatsapp.model")
const phoneFormat = require("../utils/fortmat-phone")
const { scheduleMeeting, textMessage, Location, textMessage3, serverMessage, askImmatriculation, validMatricul, getLocation } = require("../data/template-massages")


let users = []

// Send vehicule location function
async function getPositionVehicule(immat,phoneId,phone){
   const location= await getLocation(immat)
   .then(res =>res.data )
   .catch(err => console.log(err));

   if(location && location.code<0){
      const message ={preview_url: false, body:`${location.status} \n Please enter a valid matricul number`};
      sendMessages(phoneId, phone, message)
   }

   else if(location && location.code>0){
     const vehiculLocation = {
       "longitude": location.longs,
       "latitude":  location.lats,
       "name":`${location.lats},${location.longs}`,
       "address": location.lastposition
     }
     sendLocation(phoneId,phone,vehiculLocation)
   }
  /*  else{
     const message ={preview_url: false, body:"une Erreur est subvenu avec notre serveur bien vouloir patienter quelque minutes et essayer"}
     sendMessages(phoneId, phone, message)
   } */
}

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
      if (findIndex < 0) {
        const newUser = {
          'id': entryID,
          'name': name,
          'phone': phone,
          'phoneId': phone_number_id,
          'body': body,
          'previewMessage': "",
          'scheduleMessageSent': false
        }
        users.push(newUser);
        sendMessages(phone_number_id, phone, textMessage.text);
        res.json(200);
      }

      if (findIndex >= 0) {
        const user = users[findIndex];
        user.body = body;
        if (user.body === "1" && user.previewMessage === "") {
          user.previewMessage = user.body;
          sendMessages(user.phoneId, user.phone, askImmatriculation.text);
        }
        else if (user.previewMessage === "1") {
          const formatMatricul = user.body.replace(/\s+/g,"");
          await getPositionVehicule(formatMatricul,user.phoneId,user.phone);
          user.previewMessage = ""
        }
        else if (user.body === "2" && user.previewMessage === "") {
          user.previewMessage = user.body;
          sendMessages(user.phoneId, user.phone, textMessage3.text);
          user.scheduleMessageSent = true;
        } else if (user.previewMessage === "2" && user.scheduleMessageSent === true) {
          user.body = body
          const visit = scheduleMeeting(user.body, user.name);
          if (visit) {
            sendMessages(user.phoneId, user.phone, visit.text);
          }
          user.previewMessage = "";
          scheduleMessageSent = false;
        }
        else if (user.body === "0" && user.previewMessage === "1") {
          sendMessages(user.phoneId, user.phone, textMessage.text);
          user.previewMessage = ""
        }
        else if (user.body === "3" && user.previewMessage === "") {
          let message = await serverMessage();
          if (message) {
            sendMessages(user.phoneId, user.phone, message);
          }
        } else {
          sendMessages(user.phoneId, user.phone, textMessage.text);
        }
       
      }
    }
    res.json(200);
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