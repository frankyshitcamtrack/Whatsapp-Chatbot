const fs= require('fs');
const path = require('path')
const hbjs = require('handbrake-js');

async function convertVideo(link,output) {
    const options = {
        input: link,
        output:output
    }

   await hbjs.spawn(options)
    .on('error', console.error)
    .on('output', console.log)

    return output;
}


module.exports = {convertVideo}
