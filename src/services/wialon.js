const axios = require ("axios");

function getPositionVehicul(immat){
   const API_URl ="https://bi.camtrack.mg:4589/whattsapp"
   return axios.get(`${API_URl}/lstposi?immat=${immat}`);
}

module.exports={getPositionVehicul}