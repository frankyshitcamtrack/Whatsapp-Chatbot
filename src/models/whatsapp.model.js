const axios = require("axios");
const { developement } = require("../config/whatsappApi");

const token = developement.whatsapp_token;

function sendMessages(phone_number_id,phone,message) {
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type": "text",     
    "text":message
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendInteraction(phone_number_id,phone,message){
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type": "interactive",     
    "interactive":message
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendLocation(phone_number_id,phone,message){
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type": "location",     
    "location":message
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}


function sendMediaAudio(phone_number_id,phone,link){
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type":"audio",     
     "audio":{
       "link":link
     }
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendMediaVideo(phone_number_id,phone,link){
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type":"video",     
     "video":{
       "link":link
     }
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendMediaDocument(phone_number_id,phone,link){
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type":"document",     
     "document":{
       "link":link
     }
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendDocbyId(phone_number_id,phone,id){
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type":"document",     
     "document":{
       "id":id
     }
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendVidbyId(phone_number_id,phone,id){
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type":"video",     
     "video":{
       "id":id
     }
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}


function sendAudiobyId(phone_number_id,phone,id){
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type":"audio",     
     "audio":{
       "id":id
     }
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

function sendMessageList(phone_number_id,phone){
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type": "interactive",
    "interactive": {
      "type": "list",
      "header": {
        "type": "text",
        "text": "Camtrack Survey 2024"
      },
      "body": {
        "text": "A test survey for our customer"
      },

      "action": {
        "button": "Take the survey",
        "sections": [
          {
            "title": "",
            "rows": [
              {
                "id": "SECTION_1_ROW_1_ID",
                "title": "SECTION_1_ROW_1_TITLE",
                "description": "SECTION_1_ROW_1_DESCRIPTION"
              },
              {
                "id": "SECTION_1_ROW_2_ID",
                "title": "SECTION_1_ROW_2_TITLE",
                "description": "SECTION_1_ROW_2_DESCRIPTION"
              }
            ]
          },
          {
            "title": "SECTION_2_TITLE",
            "rows": [
              {
                "id": "SECTION_2_ROW_1_ID",
                "title": "SECTION_2_ROW_1_TITLE",
                "description": "SECTION_2_ROW_1_DESCRIPTION"
              },
              {
                "id": "SECTION_2_ROW_2_ID",
                "title": "SECTION_2_ROW_2_TITLE",
                "description": "SECTION_2_ROW_2_DESCRIPTION"
              }
            ]
          }
        ]
      }
    }
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}



module.exports = { sendMessages,sendInteraction,sendLocation,sendMediaAudio,sendMediaDocument,sendMediaVideo,sendDocbyId,sendAudiobyId,sendVidbyId,sendMessageList }