const axios = require("axios");
const {developement} = require('../config/whatsappApi')

const apiKey = developement.mp4_encoder_key;


async function convertVideo(link) {
    await axios.post(
        'https://api.api2convert.com/v2/jobs',
        {
            "input": [
                {
                    "type": "remote",
                    "source": link
                }
            ],
            "conversion": [
                {
                    "category": "video",
                    "target": "mp4",
                    "options": {}
                }
            ]
        },
        {
            headers: {
                'x-oc-api-key': apiKey,
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
            return data;
        });
}




async function getJobInfo(id) {
    await axios.get(
        `https://api.api2convert.com/v2/jobs/${id}`,
        {
            headers: {
                'x-oc-api-key': apiKey,
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
            return data;
        });
}


module.exports={ convertVideo ,getJobInfo}