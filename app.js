const morgan = require("morgan")
const cors = require("cors")
const {serverMessage} = require("./src/data/template-massages")
// Imports dependencies and set up http server
const express = require("express");
const bodyParser = require("body-parser");
const {getPositionVehicule}= require("./src/controllers/whatsapp.controllers");

const whatsappRouter = require("./src/routes/whatsapp.route");


const app = express();

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));

app.use(morgan('combined'));

getPositionVehicule("CH057025");

app.use(cors());
app.use(bodyParser.json());


// Accepts POST requests at /webhook endpoint
app.use("/webhook", whatsappRouter);






