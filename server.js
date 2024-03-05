const http = require('http');

const app = require('./app');

const PORT = process.env.PORT || 1337

const server = http.createServer(app);

async function startServer(){
    server.listen(PORT,()=>(
      console.log(`listen to port ${PORT}`)
    )) 
}

startServer();