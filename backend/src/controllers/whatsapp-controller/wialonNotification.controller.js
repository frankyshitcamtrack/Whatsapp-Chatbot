const cron = require("node-cron");
const { formatMessage } = require("../../utils/formatMessage");
const { sendMessages } = require("../../models/whatsapp.model");
const { getMessagesAndNumbers } = require("../../utils/getMessagesAndNumbers");
const { formatArrPhones } = require("../../utils/fortmat-phone");
const { developement } = require("../../config/whatsappApi");
const { titleNotification } = require("../../data/constantes");

const {
  insertContact,
  getWialonContactByID,
} = require("../../models/wialon.model");

const phoneID = developement.phone_number_id;
let scheduleFunction = false;

//simple wialon notifications
async function sendSimpleWialonNotification(number, mes) {
  const fm = formatMessage(mes);
  await sendMessages(phoneID, number, fm);
  /*  await sendWialonTemplateNotification(phoneID,number,mes)
   .then((res)=>{
     const data = res.data;
     console.log(data)
    }  
 )*/
  //await sendMessages(phoneID,number,message)
}

//wiallon endpoints webhooks
async function onSendWialonNotificationMultiple(req, res) {
  const wialonNotif = req.body;

  const wialonNotifContent = Object.keys(wialonNotif)[0].replace(/\s/g, " ");

  console.log(wialonNotifContent);
  //custom wiallon notifications
  if (
    wialonNotifContent.includes(titleNotification[0]) ||
    wialonNotifContent.includes(titleNotification[1]) ||
    wialonNotifContent.includes(titleNotification[2]) ||
    wialonNotifContent.includes(titleNotification[3])
  ) {
    sendSimpleWialonNotification("699113142", JSON.stringify(wialonNotif));
  } else {
    const getMessageAndExtractNumbers = getMessagesAndNumbers(wialonNotif);
    const message = getMessageAndExtractNumbers.message;
    const numbers = getMessageAndExtractNumbers.numbers;

    //cron to save contacts in database;
    if (numbers.length > 0) {
      try {
        const phones = formatArrPhones(numbers);
        if (scheduleFunction === true) {
          phones.map(async (item) => {
            if (item) {
              const id = uuidv4();
              const contact = await getWialonContactByID(item);
              if (contact && contact.length === 0) {
                insertContact(id, item);
              }
            }
          });
        }
        if (message) {
          phones.map((item) => {
            if (item) {
              sendSimpleWialonNotification(item, message);
            }
          });
          return res.status(201).json({ ok: true });
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        console.error("error of: ", error);
        return res.status(500).send("Post received, but we have an error!");
      }
    }
  }
}

function scheduleClock() {
  cron.schedule(
    "00 4 * * *",
    async () => {
      scheduleFunction = true;
    },
    {
      scheduled: true,
      timezone: "Africa/Lagos",
    }
  );

  //clear the intervall
  cron.schedule(
    "10 6 * * *",
    async () => {
      scheduleFunction = false;
    },
    {
      scheduled: true,
      timezone: "Africa/Lagos",
    }
  );
}

module.exports = {
  scheduleClock,
  onSendWialonNotificationMultiple,
};
