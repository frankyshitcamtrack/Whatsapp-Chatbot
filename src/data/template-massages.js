const {getFakeData}  = require("../services/mock")

const messageList ={
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


const textMessage= {
    type:"text",
    text:{preview_url: false,body: " Welcome to Camtrack ✨😃\n \n Let us know how we can help you today by choosing from the folowing options:\n"+ "- press 1 for vehicule🚗 Location \n"+
    "-press 2 to schedule a meeting with a technical member"
    }         
}

const textMessage2= {
    type:"text",
    text:{preview_url: false,body: "location is ....."
    }         
}

const textMessage3= {
    type:"text",
    text:{preview_url: false,body: "A technical member will contact you soon"}         
}

const serverMessage =()=>{
    let text=''
    getFakeData().then(res=>text=res.data[0]).catch(err => this.error=err);
    if(text){
        return {preview_url: false,body: text}  
    }
          
}


module.exports ={messageList,textMessage,textMessage2,textMessage3,serverMessage}