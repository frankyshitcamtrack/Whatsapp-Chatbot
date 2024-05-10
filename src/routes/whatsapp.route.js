const express = require('express');
const { onSendMessages, onVerification,onSendNotification,onSendEvidence,onSendImage,onSendTemplateImage,onSendTemplateVideo,onSendTemplateNotification} = require('../controllers/whatsapp.controllers');

const whatsappRouter = express.Router();


// Accepts POST requests at /webhook endpoint
whatsappRouter.post('/',onSendMessages);


// Accepts POST requests for notification or alert
whatsappRouter.post('/notifications',onSendNotification);


// Accepts POST requests for evidences or alert
whatsappRouter.post('/evidences',onSendEvidence);

// Accepts POST requests for evidences or alert
whatsappRouter.post('/image',onSendImage);


// Accepts POST requests for evidencesVideo template or alert
whatsappRouter.post('/evidence-video',onSendTemplateVideo);


// Accepts POST requests for evidencesImage template or alert
whatsappRouter.post('/evidence-image',onSendTemplateImage);

// Accepts POST requests for evidencesImage template or alert
whatsappRouter.post('/evidence-notification',onSendTemplateNotification);

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
whatsappRouter.get('/',onVerification);
 

module.exports= whatsappRouter;