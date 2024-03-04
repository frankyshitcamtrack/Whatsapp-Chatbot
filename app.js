

const { onSendMessages, onVerification } = require("./src/controllers/whatsapp.controllers");


const morgan = require('morgan')
// Imports dependencies and set up http server
const express = require("express");


const app = express();

app.use(morgan('combined'));

app.use(express.json());


// Accepts POST requests at /webhook endpoint
app.post("/webhook", onSendMessages);

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
app.get("/webhook", onVerification);
