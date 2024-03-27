const morgan = require("morgan")
const cors = require("cors")
const path = require('path')

const express = require("express");
const bodyParser = require("body-parser");


const whatsappRouter = require("./src/routes/whatsapp.route");


const app = express();

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));

app.use(morgan('combined'));

//getPositionVehicule("CH057025");


app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'..','public')))

// Accepts POST requests at /webhook endpoint
app.use("/webhook", whatsappRouter);






