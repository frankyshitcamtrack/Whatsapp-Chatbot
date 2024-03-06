const axios = require ("axios");

function getFakeData(){
   const API_URl ="https://baconipsum.com/api/?type=meat-and-filler"
   return axios.get(API_URl).then(res=>res.data[0]).catch(err => this.error=err);
}

module.exports={getFakeData}