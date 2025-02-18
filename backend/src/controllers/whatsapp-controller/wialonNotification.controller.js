const cron = require('node-cron');
const { formatMessage } = require('../../utils/formatMessage');
const {
  sendMessages,
  sendTemplateConsent,
} = require('../../models/whatsapp.model');
const { getMessagesAndNumbers } = require('../../utils/getMessagesAndNumbers');
const { formatArrPhones } = require('../../utils/fortmat-phone');
const { developement } = require('../../config/whatsappApi');
const { titleNotification } = require('../../data/constantes');
const {
  getContactsWhatsapWialon,
} = require('../../services/googlesheet.service');

const {
  insertContact,
  getWialonContactByID,
} = require('../../models/wialon.model');
const { v4: uuidv4 } = require('uuid');

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
  const wialonNotifContent = Object.keys(wialonNotif)[0].replace(/\s/g, ' ');
  //console.log(wialonNotif);
  //custom wiallon notifications

  if (
    !wialonNotifContent.toLowerCase().includes('whatsapp') &&
    (wialonNotifContent.toLowerCase().includes(titleNotification[0]) ||
      wialonNotifContent.toLowerCase().includes(titleNotification[1]) ||
      wialonNotifContent.toLowerCase().includes(titleNotification[2]) ||
      wialonNotifContent.toLowerCase().includes(titleNotification[3]))
  ) {
    const vehicleImmat = wialonNotifContent
      .split(',')[0]
      .split('immatriculé ')[1]
      .split('-')[0];

    const getNumbersOnSheet = await getContactsWhatsapWialon(vehicleImmat, 'C');

    if (getNumbersOnSheet && getNumbersOnSheet.length > 0) {
      getNumbersOnSheet.map(async (item) => {
        const id = uuidv4();
        const contact = await getWialonContactByID(item);
        sendSimpleWialonNotification(item, wialonNotifContent);
        if (contact && contact.length === 0) {
          insertContact(id, item);
          await sendTemplateConsent(phoneID, item);
          setTimeout(() => {
            sendSimpleWialonNotification(item, wialonNotifContent);
          }, 100000);
        }
      });
    }
  }

  if (wialonNotifContent.toLowerCase().includes('whatsapp')) {
    const getMessageAndExtractNumbers = getMessagesAndNumbers(wialonNotif);
    const message = getMessageAndExtractNumbers.message;
    const numbers = getMessageAndExtractNumbers.numbers;

    //cron to save contacts in database;
    if (numbers.length > 0) {
      try {
        const phones = formatArrPhones(numbers);
        if (message) {
          phones.map(async (item) => {
            if (item) {
              const id = uuidv4();
              const contact = await getWialonContactByID(item);
              if (contact && contact.length === 0) {
                await sendTemplateConsent(phoneID, item).then(() => {
                  setTimeout(() => {
                    sendSimpleWialonNotification(item, message);
                  }, 10000);
                  insertContact(id, item);
                });
              } else {
                sendSimpleWialonNotification(item, message);
              }
            }
          });
          return res.status(201).json({ ok: true });
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        console.error('error of: ', error);
        return res.status(500).send('Post received, but we have an error!');
      }
    }
  }
}

function scheduleClock() {
  cron.schedule(
    '00 4 * * *',
    async () => {
      scheduleFunction = true;
    },
    {
      scheduled: true,
      timezone: 'Africa/Lagos',
    }
  );

  //clear the intervall
  cron.schedule(
    '10 6 * * *',
    async () => {
      scheduleFunction = false;
    },
    {
      scheduled: true,
      timezone: 'Africa/Lagos',
    }
  );
}

module.exports = {
  scheduleClock,
  onSendWialonNotificationMultiple,
};
