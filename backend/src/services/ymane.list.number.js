const axios = require('axios');

//const API_URl ="https://biprod.camtrack.net/ymane/noauths/listwhatsapp"
const API_URl =
  'https://biprod.camtrack.net/ymane/noauths/listwhatsappwithlang';

function getYmaneListNumbers() {
  return axios.get(`${API_URl}`).then((res) => res.data);
}

module.exports = { getYmaneListNumbers };
