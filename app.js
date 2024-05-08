const morgan = require("morgan")

const cors = require("cors")

const path = require('path')

const express = require("express");
const bodyParser = require("body-parser");


const whatsappRouter = require("./src/routes/whatsapp.route");

const app = express();

app.use(morgan('combined'));

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'..','public')));

// Accepts POST requests at /webhook endpoint
app.use("/webhook", whatsappRouter);


app.get("/*",(req,res)=>{
    res.setHeader('Content-Type','text/html')
    res.end('<h1>Webhook connection is secured</h1>');
    console.log('test');
})


module.exports = app








