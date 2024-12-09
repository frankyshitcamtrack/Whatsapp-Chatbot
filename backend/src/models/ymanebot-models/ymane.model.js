const axios = require('axios');
const { developement } = require('../../config/whatsappApi');

const token = developement.whatsapp_token_bulk;

async function sendTemplateNotification(phone_number_id, phone, message) {
  return axios({
    method: 'POST', // Required, HTTP method, a string, e.g. POST, GET
    url: 'https://graph.facebook.com/v20.0/' + phone_number_id + '/messages',
    data: {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'template',
      template: {
        name: 'marketing_bulk_text',
        language: {
          code: 'en',
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
    console.log(error);
  });
}

//Marketing bulk
async function sendTemplateMarketingImage(
  phone_number_id,
  phone,
  message,
  link
) {
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
    console.log(error);
  });
}

//Marketing Video bulk
async function sendTemplateMatketingVideo(
  phone_number_id,
  phone,
  message,
  link
) {
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
    console.log(error);
  });
}

module.exports = {
  sendTemplateNotification,
  sendTemplateMarketingImage,
  sendTemplateMatketingVideo,
};
