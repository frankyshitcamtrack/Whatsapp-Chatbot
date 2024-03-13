const { getFakeData } = require("../services/mock");
const {getPositionVehicul} = require("../services/wialon");

const messageList = {
    type: "interactive",
    interactive: {
        "type": "list",
        "header": {
            "type": "text",
            "text": "HEADER_TEXT"
        },
        "body": {
            "text": "BODY_TEXT"
        },
        "footer": {
            "text": "FOOTER_TEXT"
        },
        "action": {
            "button": "BUTTON_TEXT",
            "sections": [
                {
                    "title": "SECTION_1_TITLE",
                    "rows": [
                        {
                            "id": "SECTION_1_ROW_1_ID",
                            "title": "SECTION_1_ROW_1_TITLE",
                            "description": "SECTION_1_ROW_1_DESCRIPTION"
                        },
                        {
                            "id": "SECTION_1_ROW_2_ID",
                            "title": "SECTION_1_ROW_2_TITLE",
                            "description": "SECTION_1_ROW_2_DESCRIPTION"
                        }
                    ]
                },
                {
                    "title": "SECTION_2_TITLE",
                    "rows": [
                        {
                            "id": "SECTION_2_ROW_1_ID",
                            "title": "SECTION_2_ROW_1_TITLE",
                            "description": "SECTION_2_ROW_1_DESCRIPTION"
                        },
                        {
                            "id": "SECTION_2_ROW_2_ID",
                            "title": "SECTION_2_ROW_2_TITLE",
                            "description": "SECTION_2_ROW_2_DESCRIPTION"
                        }
                    ]
                }
            ]
        }
    }
}


const textMessage = {
    type: "text",
    text: {
        preview_url: false, body: " Welcome to Camtrack ✨😃\n \n Let us know how we can help you today by choosing from the folowing options:\n\n"+"- Press 1 For vehicule🚗 Location\n- Press 2 Request a visit with a member"
    }
}

const textMessage2 = {
    type: "text",
    text: {
        preview_url: false, body: "location is ....."
    }
}

const textMessage3 = {
    type: "text",
    text: { preview_url: false, body: "Please enter the specifique Date and time you would like the visite to take place" }
}

const askImmatriculation = {
    type: "text",
    text: { preview_url: false, body: "Please enter your car registration number" }
}

const validMatricul = {
    type: "text",
    text: { preview_url: false, body: "Please enter a correct car registration number or enter 0 for the Main menu" }
}

const Location ={
        "longitude": -122.425332,
        "latitude": 37.758056,
        "name": "Camtrack Location for",
        "address": "1 Hacker Way, Menlo Park, CA 94025"
}


async function serverMessage() {
   const text= await getFakeData()
    .then(res => res.data[0])
    .catch(err => console.log(err));
    return { preview_url: false, body: text }
}

async function getLocation(matricul){
 const positionVehicul = await getPositionVehicul(matricul)
 return positionVehicul
}

function scheduleMeeting(time,name){
    return {type: "text",text: { preview_url: false, body:`Thanks M. ${name} for scheduling the visit at ${time} a Technical member will contact you soon for confirmation`}}
}


module.exports = { scheduleMeeting,messageList, textMessage, textMessage2, textMessage3, serverMessage,askImmatriculation,validMatricul,Location,getLocation }