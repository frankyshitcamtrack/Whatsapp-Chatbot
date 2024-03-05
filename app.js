const morgan = require('morgan')
// Imports dependencies and set up http server
const express = require("express");

const body_parser = require("body-parser");

const whatsappRouter = require("./src/routes/whatsapp.route");


const app = express();

app.use(body_parser.json());

app.use(morgan('combined'));

app.use(express.json());



// Accepts POST requests at /webhook endpoint
app.use("/webhook", whatsappRouter);



module.exports=app


