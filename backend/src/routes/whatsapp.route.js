const express = require('express');

const {onVerifyContacts,onSendMessages,onVerification,onSendNotification,onSendEvidence,onSendImage,onSendTemplateImage,onSendTemplateVideo,onSendTemplateNotification,onSendTemplateImageMultiple,onSendTemplateNotificationMultiple,onSendTemplateVideoMultiple,onSendWialonNotificationMultiple} = require('../controllers/whatsapp.controllers');

const whatsappRouter = express.Router();


// Accepts POST requests at /webhook endpoint
whatsappRouter.post('/',onSendMessages);


// Accepts POST requests for notification or alert
whatsappRouter.post('/utility_notification',onSendNotification);


// Accepts POST requests for evidences or alert
whatsappRouter.post('/utility_video',onSendEvidence);

// Accepts POST requests for evidences or alert
whatsappRouter.post('/utility_image',onSendImage);

//verify contacts
whatsappRouter.post('/verify_contacts',onVerifyContacts);

// Accepts POST requests for evidencesVideo template or alert
whatsappRouter.post('/marketing_video', onSendTemplateVideo);

// Accepts POST requests for bulkevidencesVideo template or alert
whatsappRouter.post('/bulk_marketing_video', onSendTemplateVideoMultiple);


// Accepts POST requests for evidencesImage template or alert
whatsappRouter.post('/marketing_image',onSendTemplateImage);

// Accepts POST requests for bulkevidencesImage template or alert
whatsappRouter.post('/bulk_marketing_image',onSendTemplateImageMultiple);


// Accepts POST requests for evidencesImage template or alert
whatsappRouter.post('/marketing_notification',onSendTemplateNotification);

// Accepts POST requests for evidencesImage template or alert
whatsappRouter.post('/bulk_marketing_notification',onSendTemplateNotificationMultiple);


//wialon notifications
whatsappRouter.post('/wialon_notifications',onSendWialonNotificationMultiple);

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
whatsappRouter.get('/',onVerification);
 

module.exports= whatsappRouter;