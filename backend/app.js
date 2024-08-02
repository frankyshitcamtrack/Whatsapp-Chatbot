const morgan = require("morgan")

const cors = require("cors")

const path = require('path')

const express = require("express");

const bodyParser = require("body-parser");

const {v4 : uuidv4} = require('uuid');

const id= uuidv4();

const whatsappRouter = require("./src/routes/whatsapp.route");

const api = require('./src/routes/api')

const app = express();

const {downloadVideo}= require('./src/utils/download');

app.use(morgan('combined'));

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'..','public')));

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})


//const url ='https://vss.camtrack.net:36301/fileSrv/fileDown.php?filePath=QzovUHJvZ3JhbSBGaWxlcyAoeDg2KS9Wc3NTZXJ2aWNlL3N0b3JhZ2UvYmluL3g2NC8uLi8uLi8uLi9odGRvY3MvdnNzRmlsZXMvYWxhcm1SZWNvcmQvMjAyNF8wNV8xMi9WT0tTMDAxMy9jaDAzXzIwMjQwNTEyXzA4MzkyOF8wODM5NDNfMTIyLmh3&token=40a7fbeb380a435c6e7f2053f070af16'


//const downloadPath = path.resolve(`./public/assets/video/${id}.mp4`)

// Accepts POST requests at /webhook endpoint
app.use("/webhook", whatsappRouter);

app.use("/api", api);
//downloadVideo(url,downloadPath,'https://whattsapi.camtrack.net/');

module.exports = app








