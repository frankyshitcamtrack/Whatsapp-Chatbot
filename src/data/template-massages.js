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
    message:{
        "header": {
            "type": "text",
            "text": "Welcome to Camtrack to Camtrack ✨😃"
          }, 
          "body": {
            "text": `let us know how we can help you today by choosing from the folowing options:
             
            -press 1 for vehicule🚗 Location

            -press 2 to schedule a meeting
            `
          },

    }

}


module.exports ={messageList,textMessage}