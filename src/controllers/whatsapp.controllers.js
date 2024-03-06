const { sendMessages, sendInteraction } = require("../models/whatsapp.model")
const phoneFormat = require("../utils/fortmat-phone")
const { textMessage, messageList, textMessage2 } = require("../data/template-massages")


function onSendMessages(req, res) {
  console.log(req.body);
  let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
  let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
  // extract the message text from the webhook payload

  //format phone number
  const phone = phoneFormat(from);
  const text =req.body.entry[0].changes[0].value.messages[0].text.body;
  if(text!==1){
    sendMessages(phone_number_id, phone, textMessage.text);
    res.json(200);
  }else if(text===1){
    sendMessages(phone_number_id, phone, textMessage2.text);
    res.json(200);
  }
  else{
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