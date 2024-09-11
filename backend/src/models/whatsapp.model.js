const axios = require("axios");
const { developement } = require("../config/whatsappApi");
const {formatMessage}=require("../utils/formatMessage");

const token = developement.whatsapp_token;

async function sendMessages(phone_number_id,phone,mes) {
  const message= formatMessage(mes);
  const textMessage = {
    type: "text",
    text: {
        preview_url: false, body:message}
 }
  axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v20.0/" +phone_number_id+"/messages?access_token="+token,
    data:{     
    messaging_product: "whatsapp", 
    recipient_type: "individual",      
    to: phone,    
    "type": "text",     
    "text":textMessage.text
  },
    headers: { "Content-Type": "application/json"},
  }).then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

async function sendInteraction(phone_number_id,phone,mes){
  const message= formatMessage(mes);
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

async function sendLocation(phone_number_id,phone,mes){
  const message= formatMessage(mes);
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

async function sendMediaVideo(phone_number_id, phone, link,message) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v20.0/" + phone_number_id + "/messages?access_token=" + token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      "type": "video",
      "video": {
        "link": link,
        "caption":message
      }
    },

  }).then((response) => {
    console.log(JSON.stringify(response.data));
  })
    .catch((error) => {
      console.log(error);
    });
}

async function sendMediaImage(phone_number_id, phone, link,message) {
  axios({
    method: "POST",
    url:
      "https://graph.facebook.com/v20.0/" + phone_number_id + "/messages?access_token=" + token,
    data: {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phone,
      "type": "image",
      "image": {
        "link": link,
        "caption":message
      }
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


//Send template notification ymane image
async function sendTemplateVideo(phone_number_id,phone,mes,link) {
  const message= formatMessage(mes);
 return axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v20.0/" +phone_number_id+"/messages",
    data:{
      messaging_product: "whatsapp", 
      recipient_type: "individual",      
      to: phone,  
      "type": "template",
      "template": {
        "name": "ymane_notification_video",
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
                  "link":link
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
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
   }
  })
    .catch((error) => {
      console.log(error);
    });
}

//Send template notification ymane image
async function sendUtilityTemplateImage(phone_number_id,phone,mes,link) {
  const message= formatMessage(mes);
  return axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v20.0/" + phone_number_id +"/messages",
    data:{
      messaging_product: "whatsapp", 
      recipient_type: "individual",      
      to: phone,  
      "type": "template",
      "template": {
        "name": "ymane_notification_image",
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
                  "link":link
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
          },
        ]
      }
    },
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
   }
  }) 
    .catch((error) => {
      console.log(error);
    });
}


//Send template notification ymane
async function sendTemplateNotification(phone_number_id,phone,mes) {
  const message= formatMessage(mes);
 return axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v20.0/" +phone_number_id+"/messages",
    data:{
      messaging_product: "whatsapp", 
      recipient_type: "individual",      
      to: phone,  
      "type": "template",
      "template": {
        "name": "ymane_notifications_messages",
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
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
   }
  }) 
    .catch((error) => {
      console.log(error);
    });
}

//Send template notification wialon
async function sendWialonTemplateNotification(phone_number_id,phone,message) {
  const newPhone = `+${phone}`
  console.log(newPhone);
  console.log(message);
  return axios({
     method: "POST", // Required, HTTP method, a string, e.g. POST, GET
     url:
       "https://graph.facebook.com/v20.0/" +phone_number_id+"/messages",
     data:{
       messaging_product: "whatsapp", 
       recipient_type: "individual",      
       to: newPhone,  
       "type": "template",
       "template": {
         "name": "wialon_notifications",
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
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
    }
   }) 
     .catch((error) => {
       console.log(error);
     });
 }
 

//Marketing bulk
async function sendTemplateMarketingImage(phone_number_id,phone,mes,link) {
  const message= formatMessage(mes);
  return axios({
    method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    url:
      "https://graph.facebook.com/v20.0/" + phone_number_id +"/messages",
    data:{
      messaging_product: "whatsapp", 
      recipient_type: "individual",      
      to: phone,  
      "type": "template",
      "template": {
        "name": "marketing_bulk",
        "language": {
          "code": "en"
        },
        "components": [
          {
            "type": "header",
            "parameters": [
              {
                "type": "image",
                "image": {
                  "link":link
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
          },
        ]
      }
    },
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
   }
  }) 
     .catch((error) => {
       console.log(error);
     });
}

//Marketing Video bulk
async function sendTemplateMatketingVideo(phone_number_id,phone,mes,link) {
  const message= formatMessage(mes);
  return axios({
     method: "POST", // Required, HTTP method, a string, e.g. POST, GET
     url:
       "https://graph.facebook.com/v20.0/" +phone_number_id+"/messages",
     data:{
       messaging_product: "whatsapp", 
       recipient_type: "individual",      
       to: phone,  
       "type": "template",
       "template": {
         "name": "bulk_video",
         "language": {
           "code": "en"
         },
         "components": [
           {
             "type": "header",
             "parameters": [
               {
                 "type": "video",
                 "video": {
                   "link":link
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
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
    }
   })
     .catch((error) => {
       console.log(error);
     });
 }
 
//ymane multiple video notifications
async function sendTemplateVideoMultiple(phone_number_id,arr,mes,link){
  const message= formatMessage(mes);
  return arr.map( async item=>{
    if(item){
      //await sendTemplateVideo(phone_number_id,item,message,link)
      await sendMediaVideo(phone_number_id,item,link,message);
    }
     
  })
}

//ymane multiple image notifications
async function sendTemplateImageMultiple(phone_number_id,arr,mes,link){
  const message= formatMessage(mes);
  return arr.map( async item=>{
    if(item){
      //await sendUtilityTemplateImage(phone_number_id,item,message,link)
      await sendMediaImage(phone_number_id,item,link,message);
    }
     
  })
}

//ymane multiple messages notifications
async function sendTemplateNotificationMultiple(phone_number_id,arr,message){
  return arr.map( async item=>{
    if(item){
      console.log(item);
      //await sendTemplateNotification(phone_number_id,item,message);
      await sendMessages(phone_number_id,item,message);
    }
   
  })
}


//wialon multiple messages sent
async function sendWialonTemplateNotificationMultiple(phone_number_id,arr,message){
  const newMessage= formatMessage(message);
  return arr.map( async item=>{
    if(item){
      await sendWialonTemplateNotification(phone_number_id,item,newMessage);
      //await sendMessages(phone_number_id,item,message);
    }
    
  })
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
  sendTemplateNotification,
  sendTemplateVideoMultiple,
  sendTemplateImageMultiple,
  sendTemplateNotificationMultiple,
  sendWialonTemplateNotification,
  sendTemplateMarketingImage,
  sendTemplateMatketingVideo,
  sendWialonTemplateNotificationMultiple
}