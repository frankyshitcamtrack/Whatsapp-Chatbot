const fs= require('fs');
const hbjs = require('handbrake-js');
const {deleteMedia} = require('./deleteMedia')

async function convertVideo(link,output) {
    const options = {
        input: link,
        output:output
    }

   await hbjs.spawn(options)
    .on('error', console.error)
    .on('output', console.log)

    setTimeout(()=>{
      deleteMedia(output);
    },300000);

    return output;
}


module.exports = {convertVideo}
