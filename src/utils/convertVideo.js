const fs= require('fs');
const path = require('path')
const hbjs = require('handbrake-js');
const { path } = require('../../app');

async function convertVideo(link,output) {
   const input = path.resolve(link) 
    const options = {
        input: input,
        output:output
    }

   await hbjs.spawn(options)
    .on('error', console.error)
    .on('output', console.log)

    return output;
}


module.exports = {convertVideo}
