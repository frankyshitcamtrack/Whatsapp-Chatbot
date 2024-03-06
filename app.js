const morgan = require('morgan')
// Imports dependencies and set up http server

const body_parser = require('body-parser')

const express = require("express");


const whatsappRouter = require("./src/routes/whatsapp.route");


const app = express();

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));

app.use(morgan('combined'));

app.use(body_parser.json());


// Accepts POST requests at /webhook endpoint
app.use("/webhook", whatsappRouter);






