const axios = require('axios');

async function listenWebhooks() {
    await axios.post(
        `https://whattsapi.camtrack.net:443/webhook`,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then((response) => {
            const data = response.data
            console.log(JSON.stringify(data));
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports={listenWebhooks}
