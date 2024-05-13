const axios = require("axios");
const fs = require('fs');
const path = require('path');
const {getEvidenceName}= require('./getFileName');
const {convertVideo}= require('./convertVideo');

 
async function downloadVideo(url,outputDownloadPath,fullUrl) {
    const evidencName = getEvidenceName()
    const output = `public/assets/evidence/${evidencName}.mp4`
    const writer = fs.createWriteStream(outputDownloadPath);

    return axios({
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
        .then(async ()=>{
            await convertVideo(outputDownloadPath,output)
            .then(()=>{
               const filePath= `${fullUrl}${output}`
               console.log(filePath);
               return filePath;
           })});
    })
  
  
}

module.exports={downloadVideo}