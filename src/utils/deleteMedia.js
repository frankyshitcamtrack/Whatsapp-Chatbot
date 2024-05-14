const fs =require('fs');
const path = require('path');


async function deleteMedia(link){
    const isExistPath = fs.existsSync(link);
    if(isExistPath){
        try {
            await fs.unlinkSync(link);
            console.log(`File ${link} has been deleted.`);
          } catch (err) {
            console.error(err);
          }
    }
}

module.exports={deleteMedia}