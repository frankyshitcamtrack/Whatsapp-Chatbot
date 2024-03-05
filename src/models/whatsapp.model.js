const axios = require("axios");
const { developement } = require("../config/whatsappApi");


const token = developement.whatsapp_token;

function sendMessages(phone_number_id, msg_body, from) {
  axios.post("https://graph.facebook.com/v12.0/" +
    phone_number_id +
    "/messages?access_token=" +
    token, {
    messaging_product: "whatsapp",
    to: from,
    text: { body: "Ack: " + msg_body },
  })
    .then((response) => {
      console.log(response);
    }).catch(error=>{
      console.log(error)
    });
  
}

module.exports = { sendMessages }