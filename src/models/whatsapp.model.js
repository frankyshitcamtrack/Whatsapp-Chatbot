const axios = require("axios");
const {developement}= require("../config/whatsappApi");


const token = developement.whatsapp_token;

function sendMessages(phone_number_id,msg_body,from){
    axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url:
          "https://graph.facebook.com/v12.0/" +
          phone_number_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: { body: "Ack: "+ msg_body},
        },
        headers: { "Content-Type": "application/json" },
      });
}

module.exports={sendMessages}