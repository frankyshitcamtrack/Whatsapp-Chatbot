const axios = require("axios");
const { developement } = require("../config/whatsappApi");

const token = developement.whatsapp_token;

async function sendMessages(phone_number_id,phone,message) {
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v12.0/" +phone_number_id+"/messages?access_token="+token,
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

async function sendInteraction(phone_number_id,phone,message){
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

async function sendLocation(phone_number_id,phone,message){
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


async function sendMediaAudio(phone_number_id,phone,link){
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

async function sendMediaVideo(phone_number_id, phone, link) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v12.0/" + phone_number_id + "/messages?access_token=" + token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      "type": "video",
      "video": {"link": link}
    },

  }).then((response) => {
    console.log(JSON.stringify(response.data));
  })
    .catch((error) => {
      console.log(error);
    });
}

async function sendMediaImage(phone_number_id, phone, link) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v12.0/" + phone_number_id + "/messages?access_token=" + token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      "type": "image",
      "image": {"link": link}
    },
  }).then((response) => {
    console.log(JSON.stringify(response.data));
  })
    .catch((error) => {
      console.log(error);
    });
}

async function sendMediaDocument(phone_number_id,phone,link){
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

async function sendDocbyId(phone_number_id,phone,id){
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

async function sendVidbyId(phone_number_id,phone,id){
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


async function sendAudiobyId(phone_number_id,phone,id){
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

async function sendMessageList(phone_number_id,phone){
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:"https://graph.facebook.com/v12.0/" +phone_number_id +"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type": "interactive",
    "interactive": {
      "type": "list",
      "header": {
        "type": "text",
        "text": "test survey"
      },
      "body": {
        "text": "a simple survey for test purpose"
      },
      "action": {
        "button": "Take the survey",
        "sections": [
          {
            "title": "List of item",
            "rows": [
              {
                "id": "1",
                "title": "item 1",
                "description": "description item 1"
              },
              {
                "id": "2",
                "title": "item 2",
                "description": "description item 2"
              },
              {
                "id": "3",
                "title": "item 3",
                "description": "description item 3"
              },
              {
                "id": "4",
                "title": "item 4",
                "description": "description item 4"
              }
            ]
          },
         
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


async function sendTemplateVideo(phone_number_id,phone,message,link) {
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v18.0/" +phone_number_id+"/messages?access_token="+token,
    data:{
      messaging_product: "whatsapp", 
      recipient_type: "individual",      
      to: phone,  
      "type": "template",
      "template": {
        "name": "evidencevideo",
        "language": {
          "code": "fr"
        },
        "components": [
          {
            "type": "header",
            "parameters": [
              {
                "type": "video",
                "video": {
                  "link": link,
                }
              },
            ]
          },
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": message
              },
            ]
          }
        ]
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

async function sendUtilityTemplateImage(phone_number_id,phone,message,link) {
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v18.0/" + phone_number_id +"/messages?access_token="+token,
    data:{
      messaging_product: "whatsapp", 
      recipient_type: "individual",      
      to: phone,  
      "type": "template",
      "template": {
        "name": "evidencesimage",
        "language": {
          "code": "fr"
        },
        "components": [
          {
            "type": "header",
            "parameters": [
              {
                "type": "image",
                "image": {
                  "link": link
                }
              }
            ]
          },
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": message
              },
     
            ]
          }
        ]
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

async function sendTemplateNotification(phone_number_id,phone,message) {
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v18.0/" +phone_number_id+"/messages?access_token="+token,
    data:{
      messaging_product: "whatsapp", 
      recipient_type: "individual",      
      to: phone,  
      "type": "template",
      "template": {
        "name": "evidencemessage",
        "language": {
          "code": "fr"
        },
        "components": [
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": message
              },
            ]
          }
        ]
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




module.exports = { 
  sendMessages,
  sendInteraction,
  sendMediaImage,
  sendLocation,
  sendMediaAudio,
  sendMediaDocument,
  sendMediaVideo,
  sendDocbyId,
  sendAudiobyId,
  sendVidbyId,
  sendMessageList ,
  sendTemplateVideo,
  sendUtilityTemplateImage,
  sendTemplateNotification
}