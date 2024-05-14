const fs= require('fs');
const hbjs = require('handbrake-js');
const { path } = require('../../app');

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
