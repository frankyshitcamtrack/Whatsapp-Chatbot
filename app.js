const token = process.env.WHATSAPP_TOKEN;

// Imports dependencies and set up http server
 const express = require("express");
 const body_parser = require("body-parser");
 const { onSendMessages, onVerification } = require("./src/controllers/whatsapp.controllers");
 
 const app = express().use(body_parser.json()); // creates express http server

 

// Accepts POST requests at /webhook endpoint
app.post("/webhook",onSendMessages);

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
app.get("/webhook",onVerification);
