const { sendMessages, sendLocation } = require("../models/whatsapp.model")
const phoneFormat = require("../utils/fortmat-phone")
const { scheduleMeeting,textMessage, Location ,textMessage3, serverMessage,askImmatriculation,validMatricul,getLocation} = require("../data/template-massages")



let previewMessage='';
let scheduleMessageSent = false;

async function onSendMessages(req, res) {
  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));
  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;// extract the phone number from the webhook payload
      let from = req.body.entry[0].changes[0].value.messages[0].from;  // extract the message text from the webhook payload
      let body =req.body.entry[0].changes[0].value.messages[0].text.body;
      let name =req.body.entry[0].changes[0].value.contacts[0].profile.name;
     
      //format phone number
      const phone = phoneFormat(from);
      if (body === "1" && previewMessage==="") {
          previewMessage = req.body.entry[0].changes[0].value.messages[0].text.body;
          sendMessages(phone_number_id, phone,askImmatriculation.text);
      }
      else if(body.replace(/\s+/g, "").toLowerCase()==="lt3307" && previewMessage==="1"){
        const matricul =req.body.entry[0].changes[0].value.messages[0].text.body;
        const formatMatricul=matricul.replace(/\s+/g, "").toLowerCase();
        const location = getLocation(formatMatricul);
        if(location){
          sendLocation(phone_number_id, phone,location);
          previewMessage="";
        }
      } 
      else if( body!=="0" && body !== "LT3307" && previewMessage==="1" ){
        sendMessages(phone_number_id, phone, validMatricul.text);
      } 
      else if (body === "2" && previewMessage==="") {
        previewMessage=body;
        sendMessages(phone_number_id, phone, textMessage3.text);
        scheduleMessageSent=true;
        
      } else if (previewMessage==="2" && scheduleMessageSent===true){
        const visit = scheduleMeeting(body,name);
        if(visit){
          sendMessages(phone_number_id, phone,visit.text);
        }
        previewMessage="";
        scheduleMessageSent=false;
      }
      else if (body === "0" && previewMessage==="1") {
        sendMessages(phone_number_id, phone, textMessage.text);
        previewMessage=""
      }
      else if(body === "3" && previewMessage===""){
        let message =await serverMessage();
        if(message){
          sendMessages(phone_number_id, phone, message);
        }
      }
      else{
        sendMessages(phone_number_id, phone, textMessage.text);
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

module.exports = { onSendMessages, onVerification }