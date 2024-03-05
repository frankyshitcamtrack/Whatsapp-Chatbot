"use strict";

const express = require("express");

const body_parser = require("body-parser");

const whatsappRouter = require("./src/routes/whatsapp.route");


const app = express();

app.use(body_parser.json());

app.use("/webhook", whatsappRouter);



module.exports=app


