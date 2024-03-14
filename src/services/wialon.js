const axios = require ("axios");

const API_URl ="https://bi.camtrack.mg:4589/whattsapp"

function getPositionVehicul(immat){
   return axios.get(`${API_URl}/lstposi?immat=${immat}`);
}

function getPositionVehiculByDate(date,immat){
   return axios.get(`${API_URl}/lstposibydat?date=${date}&immat=${immat}`);
}

module.exports={getPositionVehicul,getPositionVehiculByDate}