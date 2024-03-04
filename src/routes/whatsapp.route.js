const express = require('express');
const { onSendMessages, onVerification } = require('../controllers/whatsapp.controllers');

const whatsappRouter = express.Router();


// Accepts POST requests at /webhook endpoint
whatsappRouter.post('/',onSendMessages);

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
whatsappRouter.get('/',onVerification);
 

module.exports= whatsappRouter;