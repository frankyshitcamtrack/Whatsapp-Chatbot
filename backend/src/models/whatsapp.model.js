const axios = require('axios');
const { developement } = require('../config/whatsappApi');
const { formatMessage } = require('../utils/formatMessage');
const { getYmaneListNumbers } = require('../services/ymane.list.number');

const token = developement.whatsapp_token;

//const token = developement.whatsapp_token_bulk;

async function verifyContacts(phoneArr) {
  try {
    return axios({
      method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
      url: 'https://whattsapi.camtrack.net:443/v1/contacts',
      data: {
        blocking: 'wait',
        contacts: phoneArr,
        force_check: true,
      },
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.log(err.message);
  }
}

async function sendMessages(phone_number_id, phone, mes) {
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v20.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'text',
      text: { preview_url: false, body: mes },
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function sendInteraction(phone_number_id, phone, mes) {
  const message = formatMessage(mes);
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v12.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'interactive',
      interactive: message,
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function sendLocation(phone_number_id, phone, mes) {
  const message = formatMessage(mes);
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v12.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'location',
      location: message,
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function sendMediaAudio(phone_number_id, phone, link) {
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v12.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'audio',
      audio: {
        link: link,
      },
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function sendMediaVideo(phone_number_id, phone, link, message) {
  axios({
    method: 'POST',
    url:
      'https://graph.facebook.com/v20.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'video',
      video: {
        link: link,
        caption: message,
      },
    },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function sendMediaImage(phone_number_id, phone, link, message) {
  axios({
    method: 'POST',
    url:
      'https://graph.facebook.com/v20.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'image',
      image: {
        link: link,
        caption: message,
      },
    },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function sendMediaDocument(phone_number_id, phone, link) {
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v12.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'document',
      document: {
        link: link,
      },
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function sendDocbyId(phone_number_id, phone, id) {
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v12.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'document',
      document: {
        id: id,
      },
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function sendVidbyId(phone_number_id, phone, id) {
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v12.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'video',
      video: {
        id: id,
      },
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function sendAudiobyId(phone_number_id, phone, id) {
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v12.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'audio',
      audio: {
        id: id,
      },
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

async function sendMessageList(phone_number_id, phone) {
  axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url:
      'https://graph.facebook.com/v12.0/' +
      phone_number_id +
      '/messages?access_token=' +
      token,
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'interactive',
      interactive: {
        type: 'list',
        header: {
          type: 'text',
          text: 'test survey',
        },
        body: {
          text: 'a simple survey for test purpose',
        },
        action: {
          button: 'Take the survey',
          sections: [
            {
              title: 'List of item',
              rows: [
                {
                  id: '1',
                  title: 'item 1',
                  description: 'description item 1',
                },
                {
                  id: '2',
                  title: 'item 2',
                  description: 'description item 2',
                },
                {
                  id: '3',
                  title: 'item 3',
                  description: 'description item 3',
                },
                {
                  id: '4',
                  title: 'item 4',
                  description: 'description item 4',
                },
              ],
            },
          ],
        },
      },
    },
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error.message);
    });
}

//Send template notification consent french version
async function sendTemplateConsent(phone_number_id, phone) {
  return axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url: 'https://graph.facebook.com/v20.0/' + phone_number_id + '/messages',
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'template',
      template: {
        name: 'opt_in_consent',
        language: {
          code: 'fr',
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: phone,
              },
            ],
          },
        ],
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(error.message);
  });
}

//Send template notification consent english version
async function sendTemplateConsentEn(phone_number_id, phone) {
  return axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url: 'https://graph.facebook.com/v20.0/' + phone_number_id + '/messages',
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'template',
      template: {
        name: 'opt_in_consent_en',
        language: {
          code: 'en',
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: phone,
              },
            ],
          },
        ],
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(error.message);
  });
}

//Send template notification ymane video
async function sendTemplateVideo(phone_number_id, phone, mes, link) {
  const message = formatMessage(mes);
  return axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url: 'https://graph.facebook.com/v20.0/' + phone_number_id + '/messages',
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'template',
      template: {
        name: 'evidence_video',
        language: {
          code: 'fr',
        },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'video',
                video: {
                  link: link,
                },
              },
            ],
          },
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: message,
              },
            ],
          },
        ],
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(error.message);
  });
}

//Send template notification ymane image
async function sendUtilityTemplateImage(phone_number_id, phone, mes, link) {
  const message = formatMessage(mes);
  return axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url: 'https://graph.facebook.com/v20.0/' + phone_number_id + '/messages',
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'template',
      template: {
        name: 'evidence_image',
        language: {
          code: 'fr',
        },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'image',
                image: {
                  link: link,
                },
              },
            ],
          },
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: message,
              },
            ],
          },
        ],
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(error.message);
  });
}

//Send template notification ymane
async function sendTemplateNotification(phone_number_id, phone, mes) {
  const message = formatMessage(mes);
  return axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url: 'https://graph.facebook.com/v20.0/' + phone_number_id + '/messages',
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'template',
      template: {
        name: 'evidencemessage',
        language: {
          code: 'fr',
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: message,
              },
            ],
          },
        ],
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(error.message);
  });
}

//Send template notification wialon
async function sendWialonTemplateNotification(phone_number_id, phone, message) {
  const mes = formatMessage(message);
  const stringPhone = phone.toString();
  const number = `+${stringPhone}`;
  return axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url: 'https://graph.facebook.com/v20.0/' + phone_number_id + '/messages',
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: number,
      type: 'template',
      template: {
        name: 'camtrack_notifications',
        language: {
          code: 'en',
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: mes,
              },
            ],
          },
        ],
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(error.message);
  });
}

//Marketing bulk
async function sendTemplateMarketingImage(phone_number_id, phone, mes, link) {
  const message = formatMessage(mes);
  return axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url: 'https://graph.facebook.com/v20.0/' + phone_number_id + '/messages',
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'template',
      template: {
        name: 'marketing_bulk',
        language: {
          code: 'en',
        },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'image',
                image: {
                  link: link,
                },
              },
            ],
          },
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: message,
              },
            ],
          },
        ],
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(error.message);
  });
}

//Marketing Video bulk
async function sendTemplateMatketingVideo(phone_number_id, phone, mes, link) {
  const message = formatMessage(mes);
  return axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url: 'https://graph.facebook.com/v20.0/' + phone_number_id + '/messages',
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'template',
      template: {
        name: 'bulk_video',
        language: {
          code: 'en',
        },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'video',
                video: {
                  link: link,
                },
              },
            ],
          },
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: message,
              },
            ],
          },
        ],
      },
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.log(error.message);
  });
}

//ymane multiple video notifications
async function sendTemplateVideoMultiple(phone_number_id, arr, mes, link) {
  const message = formatMessage(mes);
  arr.map(async (item) => {
    if (item) {
      await sendMediaVideo(phone_number_id, item, link, message);
      //await sendTemplateVideo(phone_number_id,item,message,link)
    }
  });
}

//ymane multiple image notifications
async function sendTemplateImageMultiple(phone_number_id, arr, mes, link) {
  const message = formatMessage(mes);
  arr.map(async (item) => {
    if (item) {
      //console.log(item);
      await sendMediaImage(phone_number_id, item, link, message);
      //await sendUtilityTemplateImage(phone_number_id,item,message,link)
    }
  });
}

//ymane multiple messages notifications
async function sendTemplateNotificationMultiple(phone_number_id, arr, mes) {
  const message = mes.replace(/\r?\\n|\r/g, '\n');
  arr.map(async (item) => {
    if (item) {
      //console.log(item);
      await sendMessages(phone_number_id, item, message);
      //await sendTemplateNotification(phone_number_id,item,mes)
    }
  });
}

/* //wialon multiple messages sent
async function sendWialonTemplateNotificationMultiple(phone_number_id,arr,message){
  const newMessage = formatMessage(message);
  arr.map( async item=>{
    if(item){
      await sendWialonTemplateNotification(phone_number_id,item,newMessage)
      .then(res=>{
        const data =res.data
        console.log(da)
      });
      //await sendMessages(phone_number_id,item,message);
    }
    
  })
} */

async function ymaneListNumbers() {
  const numbers = await getYmaneListNumbers();
  return numbers;
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
  sendMessageList,
  sendTemplateVideo,
  sendUtilityTemplateImage,
  sendTemplateNotification,
  sendTemplateVideoMultiple,
  sendTemplateImageMultiple,
  sendTemplateNotificationMultiple,
  sendWialonTemplateNotification,
  sendTemplateMarketingImage,
  sendTemplateMatketingVideo,
  verifyContacts,
  sendTemplateConsent,
  ymaneListNumbers,
  sendTemplateConsentEn,
};
