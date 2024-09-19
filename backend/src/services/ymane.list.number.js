const axios = require ("axios");

const API_URl ="https://bi.camtrack.net/ymane/noauths/listwhatsapp"

function getYmaneListNumbers(){
   return axios.get(`${API_URl}`)
           .then(res=>res.data);
}

 
module.exports={getYmaneListNumbers}