const https = require('https');
const fs = require('fs');

require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 8000;

const options = {
    key: fs.readFileSync('./ssl/file.key'),
    cert: fs.readFileSync('./ssl/file.cert'),
    ca: fs.readFileSync('./ssl/file.ca'),
}; 

const server = https.createServer(options,app);


async function startServer(){
    server.listen(PORT,()=>(
      console.log(`webhook is listening to port ${PORT}`)
    ))  
}
  

startServer();




