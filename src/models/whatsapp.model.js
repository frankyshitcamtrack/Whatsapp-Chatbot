const axios = require("axios");
const { developement } = require("../config/whatsappApi");

const token = developement.whatsapp_token;

function sendMessages(phone_number_id, phone, message) {

  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type": "TEXT",     
     type:message
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