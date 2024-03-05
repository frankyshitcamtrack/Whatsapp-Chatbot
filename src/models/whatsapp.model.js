const axios = require("axios");
const { developement } = require("../config/whatsappApi");
const phoneFormat = require("../utils/fortmat-phone")


const token = developement.whatsapp_token;

function sendMessages(phone_number_id, msg_body, from) {
  const phone = phoneFormat(from);
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type": "text",     
    "text": { preview_url: false, body: msg_body }
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { sendMessages }