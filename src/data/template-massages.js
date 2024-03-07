const { getFakeData } = require("../services/mock")

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
        preview_url: false, body: " Welcome to Camtrack ✨😃\n \n Let us know how we can help you today by choosing from the folowing options:\n" + "- press 1 for vehicule🚗 Location \n" +
            "-press 2 to schedule a meeting with a technical member"
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
    text: { preview_url: false, body: "A technical member will contact you soon" }
}

const askImmatriculation = {
    type: "text",
    text: { preview_url: false, body: "Veuillez saisir votre immatriculation s'il vous plait" }
}

const validMatricul = {
    type: "text",
    text: { preview_url: false, body: "Veuillez saisir un numero de matricule correct" }
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
    .catch(err => this.error = err);
    return { preview_url: false, body: text }
}

function getLocation(matricul){
    return {
        "longitude": 9.7428,
        "latitude": 4.0892,
        "name": `Camtrack Location for Matricule ${matricul} `,
        "address": "Douala,Bonamoussadi"
    }
}


module.exports = { messageList, textMessage, textMessage2, textMessage3, serverMessage,askImmatriculation,validMatricul,Location,getLocation }