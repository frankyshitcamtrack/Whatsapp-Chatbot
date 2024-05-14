const {v4 : uuidv4} = require('uuid');

function getEvidenceName(){
   const newId = uuidv4()
   const date = new Date();
   const ms = date.getMilliseconds()

   return `evidence-${ms}-${newId}`
}

module.exports={getEvidenceName}