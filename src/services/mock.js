const axios = require ("axios");

function getFakeData(){
   const API_URl ="https://baconipsum.com/api/?type=meat-and-filler"
   return axios.get(API_URl);
}

module.exports={getFakeData}