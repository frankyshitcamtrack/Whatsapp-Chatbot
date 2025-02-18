const https = require('https');

//const http = require("http");
const fs = require('fs');

require('dotenv').config();

const app = require('./app');

//locale
//const PORT = process.env.PORT || 8000;
//const server = http.createServer(app);

//production
const PORT = process.env.PORT || 443;

const options = {
  key: fs.readFileSync('./ssl/camtrack_net.key'),
  cert: fs.readFileSync('./ssl/camtrack_net.crt'),
  ca: fs.readFileSync('./ssl/camtrack_net.ca-bundle'),
};

const server = https.createServer(options, app);

async function startServer() {
  server.listen(PORT, () =>
    console.log(`webhook is listening to port ${PORT}`)
  );
}

startServer();
