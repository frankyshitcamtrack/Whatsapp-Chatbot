const { onSendMessages, onVerification } = require("./src/controllers/whatsapp.controllers");


const morgan = require('morgan')

const express = require("express");
const whatsappRouter = require("./src/routes/whatsapp.route");



const app = express();

app.use(morgan('combined'));

app.use(express.json());


app.use("/webhook",whatsappRouter);
