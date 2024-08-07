const path = require('path');
const axios = require("axios");
const fs =require('fs');
const {deleteMedia} = require('./deleteMedia');

async function downloadImage(url,outputDownloadPath,fullUrl) {
    const writer = fs.createWriteStream(outputDownloadPath);
    const filePath = `${fullUrl}/${outputDownloadPath}`;
    const newPath= filePath.replace('/public','');
    try{
        axios({
            method: 'get',
            url: url,
            responseType: 'stream',
        })
           .then(response => {
               new Promise((resolve, reject) => {
                   response.data.pipe(writer);
                   let error = null;
                   writer.on('error', err => {
                       error = err;
                       writer.close();
                       reject(err);
                   });
                   writer.on('close', () => {
                       if (!error) {
                           resolve(true);
                       }
                   });
               })
           })
           .then(()=>{
            setTimeout(async ()=>{
               await deleteMedia(outputDownloadPath);
              },300000);
           })
      
        return newPath
    } catch(err){
        console.log(err);
    }

}

module.exports={downloadImage}