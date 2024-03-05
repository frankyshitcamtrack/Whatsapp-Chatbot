const morgan = require('morgan')

const express = require("express");

const body_parser = require("body-parser");

const whatsappRouter = require("./src/routes/whatsapp.route");


const app = express();

app.use(body_parser.json());

app.use(morgan('combined'));

app.use(express.json());



app.use("/webhook", whatsappRouter);



module.exports=app


