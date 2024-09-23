const path = require('path');
const cron = require('node-cron');
const { sendMessages, sendTemplateConsent, sendMediaImage, sendMediaVideo, sendAudiobyId, sendDocbyId, sendVidbyId, sendMessageList, sendUtilityTemplateImage, sendTemplateVideo, sendTemplateNotification, sendTemplateImageMultiple, sendTemplateNotificationMultiple, sendTemplateVideoMultiple, sendWialonTemplateNotification, verifyContacts, ymaneListNumbers } = require("../models/whatsapp.model");
const { getWialonContacts, insertContact,getWialonContactByID } = require('../models/wialon.model');
const { phoneFormat, formatArrPhones } = require("../utils/fortmat-phone");
const dateInYyyyMmDdHhMmSs = require("../utils/dateFormat");
const { notification, textMessageMenu1, scheduleMeeting, textMessage, textMessage3, askImmatriculation, getLocation, askDateMessage, getLocationByDate, genericMessage } = require("../data/template-massages");
const { developement } = require("../config/whatsappApi");
const { downloadVideo } = require("../utils/download");
const { downloadImage } = require('../utils/downloadImg');
const { getMessagesAndNumbers } = require('../utils/getMessagesAndNumbers');
const { formatMessage } = require('../utils/formatMessage')
const { v4: uuidv4 } = require('uuid');

const phoneID = developement.phone_number_id
const token = developement.whatsapp_token;
let scheduleFunction = false;

let users = []

// Send vehicule location function
async function getPositionVehicule(user) {
  const location = await getLocation(user.vehicleNumber)
    .then(res => res.data)
    .catch(err => console.log(err));
  console.log(location);
  if (location && location.code < 0) {
    const message = { preview_url: false, body: `${location.status} \n Please enter a valid matricul number` };
    await sendMessages(user.phoneId, user.phone, message);
    user.previewMessage = "1"
    user.flow = "1"
  }

  else if (location && location.code > 0) {
    let vehiculLocation = {
      "address": location.lastposition,
      "latitude": location.lats,
      "longitude": location.longs,
      "name": `${location.lats},${location.longs}`,
      "dates": location.dates
    }
    if (vehiculLocation.latitude && vehiculLocation.longitude) {
      let repportDate = new Date(vehiculLocation.dates);
      let date = dateInYyyyMmDdHhMmSs(repportDate);
      let link = `https://www.google.com/maps/place/${vehiculLocation.latitude}+${vehiculLocation.longitude}`;
      let body = `*Vehicle* : ${user.vehicleNumber}\n\n*Last known position* :  ${vehiculLocation.address}\n\n*Report time* : ${date}\n\n*Link* : ${link}`;
      let message = { preview_url: false, body: body }
      //sendLocation(phoneId,phone,vehiculLocation)
      await sendMessages(user.phoneId, user.phone, message);
      user.previewMessage = "";
      user.flow = "";
      user.vehicleNumber = "";
      user.dates = "";
      user.scheduleMessageSent = false;
      user.matriculeQuestionSent = false;
      user.dateMessage = false;
    }
  }
  else {
    const message = { preview_url: false, body: "une Erreur est subvenu avec notre serveur bien vouloir patienter quelque minutes et essayer" }
    await sendMessages(user.phoneId, user.phone, message);
  }
}


//Send vehicle location by specific date
async function getPositionVehicleByDate(user) {
  const location = await getLocationByDate(user.date, user.vehicleNumber)
    .then(res => res.data)
    .catch(err => console.log(err));
  if (location && location.code < 0) {
    const message = { preview_url: false, body: `${location.status}` };
    await sendMessages(user.phoneId, user.phone, message);
    user.previewMessage = "";
    user.flow = "";
    user.vehicleNumber = "";
    user.dates = "";
    user.scheduleMessageSent = false;
    user.matriculeQuestionSent = false;
    user.dateMessage = false;
  }

  else if (location && location.code > 0) {
    let vehiculLocation = {
      "address": location.lastposition,
      "latitude": location.lats,
      "longitude": location.longs,
      "name": `${location.lats},${location.longs}`,
      "dates": location.dates
    }
    if (vehiculLocation.latitude && vehiculLocation.longitude) {
      let newDate = new Date(vehiculLocation.dates);
      let date = dateInYyyyMmDdHhMmSs(newDate);
      let link = `https://www.google.com/maps/place/${vehiculLocation.latitude}+${vehiculLocation.longitude}`;
      let body = `*Vehicle* : ${user.vehicleNumber}\n\n*Last known position* :  ${vehiculLocation.address}\n\n*Report time* : ${date}\n\n*Link* : ${link}`;

      let message = { preview_url: false, body: body };

      await sendMessages(user.phoneId, user.phone, message);

      user.previewMessage = "";
      user.flow = "";
      user.vehicleNumber = "";
      user.dates = "";
      user.scheduleMessageSent = false;
      user.matriculeQuestionSent = false;
      user.dateMessage = false;
    }
  }
  else {
    const message = { preview_url: false, body: "une Erreur est subvenu avec notre serveur bien vouloir patienter quelque minutes et essayer" }
    await sendMessages(user.phoneId, user.phone, message)
  }
}


//verify contact
async function onVerifyContacts(req, res) {
  try {
    const arrPhones = req.body.phones;
    const phone = phoneFormat(arrPhones);
    console.log(arrPhones)
    console.log(phone);
    if (phone) {
      const verification = await verifyContacts(phone);
      console.log(verification);
      return res.status(200).json({ result: verification })
    } else {
      res.sendStatus(404);
    }

  }
  catch (error) {
    console.error('error of: ', error);   // print the error to console
    return res.status(500).send('Post received, but we have an error!');
  }
}


//Send whatsapp message
async function onSendMessages(req, res) {
  //console.log(res);
  try {
    if (req.body.object && req.body.entry && req.body.entry[0].changes && req.body.entry[0].changes[0].value && req.body.entry[0].changes[0].value.messages && req.body.entry[0].changes[0].value.contacts) {
      let entryID = req.body.entry[0].id;
      let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;// extract the phone numberId from the webhook payload
      let from = req.body.entry[0].changes[0].value.messages[0].from;  // extract the phone number text from the webhook payload
      let body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payloa
      let name = req.body.entry[0].changes[0].value.contacts[0].profile.name; // extract the name from the webhook payloa

      const findIndex = users.findIndex(item => item.name === name);
      const phone = phoneFormat(from);
      // Check the Incoming webhook message
      // console.log(JSON.stringify(req.body, null, 2));
      //console.log(users);


      // check if the user client index is not exist in the table user table and finally add the new user
      if (findIndex < 0 && body.toLowerCase() !== "start" && body.toLowerCase() !== "consent") {
        await sendMessages(phone_number_id, phone, genericMessage.text.body);
      }

      if (findIndex < 0 && body.toLowerCase() === "consent") {
        await sendTemplateConsent(phone_number_id, phone);
      }

      if (findIndex < 0 && body.toLowerCase() === "start") {
        const newUser = {
          'id': entryID,
          'name': name,
          'phone': phone,
          'phoneId': phone_number_id,
          'body': body,
          'vehicleNumber': '',
          'date': '',
          'time': '',
          'flow': "",
          'previewMessage': "",
          'scheduleMessageSent': false,
          'matriculeQuestionSent': false,
          'dateMessage': false,
        }
        users.push(newUser);
        await sendMessages(phone_number_id, phone, textMessage.text.body);
      }

      if (findIndex >= 0) { // check if the user client index exist in the table user table
        const user = users[findIndex]; // find the user by his index
        user.body = body;
        switch (true) {
          case (user.body === "1" && user.previewMessage === "start" && user.flow === ""): {
            user.previewMessage = user.body;
            user.flow = "1";
            await sendMessages(user.phoneId, user.phone, textMessageMenu1.text.body);
            break;
          }

          case (user.body === "3" && user.previewMessage === "start" && user.flow === ""): {
            await sendAudiobyId(user.phoneId, user.phone, "857694462782371");
            break;
          }

          case (user.body === "4" && user.previewMessage === "start" && user.flow === ""): {
            await sendVidbyId(user.phoneId, user.phone, "716903793964115");
            break;
          }

          case (user.body === "5" && user.previewMessage === "start" && user.flow === ""): {
            await sendDocbyId(user.phoneId, user.phone, "385059230949332");
            break;
          }

          case (user.body === "6" && user.previewMessage === "start" && user.flow === ""): {
            await sendMessageList(user.phoneId, user.phone);
            break;
          }

          case (user.flow === "1" && user.previewMessage === "1" && user.body === "2"): {
            await sendMessages(user.phoneId, user.phone, askImmatriculation.text.body);
            user.previewMessage = "2";
            user.matriculeQuestionSent = true;
            break;
          }

          case (user.flow === "1" && user.previewMessage === "1" && user.body === "1" && user.matriculeQuestionSent === false): {
            await sendMessages(user.phoneId, user.phone, askImmatriculation.text.body);
            user.matriculeQuestionSent = true;
            user.previewMessage = "1";
            break;
          }

          case (user.flow === "1" && user.previewMessage === "1" && user.body !== "1" && user.matriculeQuestionSent === false): {
            await sendMessages(user.phoneId, user.phone, textMessageMenu1.text.body);
            break;
          }

          case (user.flow === "1" && user.previewMessage === "1" && user.body !== "2" && user.matriculeQuestionSent === false): {
            await sendMessages(user.phoneId, user.phone, textMessageMenu1.text.body);
            break;
          }

          case (user.flow === "1" && user.previewMessage === "1" && user.matriculeQuestionSent === true && user.dateMessage === false): {
            user.vehicleNumber = user.body.replace(/\s+/g, "");
            await getPositionVehicule(user);
            break;
          }

          case (user.flow === "1" && user.previewMessage === "2" && user.matriculeQuestionSent === true && user.dateMessage === false): {
            let vehicleImmat = user.body
            user.vehicleNumber = vehicleImmat.replace(/\s+/g, "");
            await sendMessages(user.phoneId, user.phone, askDateMessage.text.body);
            user.dateMessage = true;
            break;
          }

          case (user.flow === "1" && user.previewMessage === "2" && user.dateMessage === true && user.matriculeQuestionSent === true): {
            user.date = user.body;
            await getPositionVehicleByDate(user);

            break;
          }

          case (user.body === "2" && user.previewMessage === "start" && user.flow === "" && user.dateMessage === false && user.matriculeQuestionSent === false && user.scheduleMessageSent === false): {
            user.previewMessage = user.body;
            await sendMessages(user.phoneId, user.phone, textMessage3.text.body);
            user.scheduleMessageSent = true;
            break;
          }

          case (user.previewMessage === "2" && user.scheduleMessageSent === true && user.flow === "" && user.dateMessage === false && user.matriculeQuestionSent === false): {
            user.body = body
            const visit = scheduleMeeting(user.body, user.name);
            await sendMessages(user.phoneId, user.phone, visit.text.body);
            user.previewMessage = "";
            user.scheduleMessageSent = false;
            break;
          }

          default:
        }

      }



      res.json(200);
    }
    else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);                                                         // print the error to console
    return res.status(500).send('Post received, but we have an error!');
  }

}


async function onVerification(req, res) {

  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
  **/
  const verify_token = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
}


async function onSendNotification(req, res) {
  try {
    const phoneID = developement.phone_number_id
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;

    if (phoneID && phone && message) {
      await sendMessages(phoneID, phone, message);
      res.json(200);
    } else {
      res.sendStatus(404);
    }

  }
  catch (error) {
    console.error('error of: ', error);   // print the error to console
    return res.status(500).send('Post received, but we have an error!');
  }
}


async function onSendEvidence(req, res) {
  try {
    const phone = phoneFormat(req.body.phone);
    const media = req.body.link;
    const message = req.body.message;
    if (phoneID && phone && media) {
      setTimeout(async () => {
        await sendMediaVideo(phoneID, phone, media,message);
      }, 10000)
      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);                                                         // print the error to console
    return res.status(500).send('Post received, but we have an error!');
  }

}


async function onSendImage(req, res) {
  try {
    const phoneID = developement.phone_number_id
    const phone = phoneFormat(req.body.phone);
    const media = req.body.link;
    if (phoneID && phone && media) {
      await sendMediaImage(phoneID, phone, media);
      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);                                                         // print the error to console
    return res.status(500).send('Post received, but we have an error!');
  }


}

async function onSendTemplateImage(req, res) {
  try {
    const phoneID = developement.phone_number_id
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;
    const img = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;
    const downloadImId = uuidv4();
    const downloadPath = `public/assets/evidence/${downloadImId}.jpg`;
    const media = await downloadImage(img, downloadPath, fullUrl);
    if (phoneID && phone && media) {
      console.log(media)
      setTimeout(async () => {
        await sendUtilityTemplateImage(phoneID, phone, message, media)
        res.json(200);
      }, 10000)
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);
    return res.status(500).send('Post received, but we have an error!');
  }
}


async function onSendTemplateNotification(req, res) {
  try {
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;
    if (phoneID && phone && message) {
      await sendTemplateNotification(phoneID, phone, message)
      res.send(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);
    return res.status(500).send('Post received, but we have an error!');
  }
}

//send single template
async function onSendTemplateVideo(req, res) {
  try {
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;
    const url = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;
    const downloadVidId = uuidv4();
    const downloadPath = path.resolve(`public/assets/video/${downloadVidId}.mp4`);
    const video = await downloadVideo(url, downloadPath, fullUrl);
    if (phoneID && phone && video) {
      setTimeout(async () => {
        await sendTemplateVideo(phoneID, phone, message, video);
        res.send(200)
      }, 15000)
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);
    return res.status(500).send('Post received, but we have an error!');
  }
}


async function onSendTemplateImageMultiple(req, res) {
  try {
    const phoneID = developement.phone_number_id

    const phoneArr = JSON.parse(req.body.phones.replace(/'/g, '"'));
    const phones = formatArrPhones(phoneArr);

    const message = req.body.message;

    const img = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;

    const downloadImId = uuidv4();
    const downloadPath = `public/assets/evidence/${downloadImId}.jpg`;

    const media = await downloadImage(img, downloadPath, fullUrl);

    if (phoneID && phones && media) {
      setTimeout(async () => {
        await sendTemplateImageMultiple(phoneID, phones, message, media)
      }, 15000)
      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);
    return res.status(500).send('Post received, but we have an error!');
  }
}


async function onSendTemplateVideoMultiple(req, res) {
  try {
    const phoneArr = JSON.parse(req.body.phones.replace(/'/g, '"'));
    const phones = formatArrPhones(phoneArr);
    const message = req.body.message;

    const url = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get('host')
    const fullUrl = `${protocol}://${hostname}`;

    const downloadVidId = uuidv4();
    const downloadPath = path.resolve(`public/assets/video/${downloadVidId}.mp4`);

    const video = await downloadVideo(url, downloadPath, fullUrl);

    if (phoneID && phones && video) {
      setTimeout(async () => {
        await sendTemplateVideoMultiple(phoneID, phones, message, video);
      }, 15000)
      
      res.send(200)
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);
    return res.status(500).send('Post received, but we have an error!');
  }
}

async function onSendTemplateNotificationMultiple(req, res) {
  try {
    const phoneArr = JSON.parse(req.body.phones.replace(/'/g, '"'));
    const phones = formatArrPhones(phoneArr);
    const message = req.body.message;
    if (phoneID && phones && message) {
      await sendTemplateNotificationMultiple(phoneID, phones, message);
      res.send(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error);
    return res.status(500).send('Post received, but we have an error!');
  }
}

//simple wialon notifications
async function sendSimpleWialonNotification(number, mes) {
  const fm = formatMessage(mes);
  await sendMessages(phoneID, number, fm)
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
  const getMessageAndExtractNumbers = getMessagesAndNumbers(wialonNotif)
  const message = getMessageAndExtractNumbers.message;
  const numbers = getMessageAndExtractNumbers.numbers;
  //cron to save contacts in database;
  if (numbers.length > 0) {
    try {
      const phones = formatArrPhones(numbers);
      if(scheduleFunction===true){
        phones.map(item => {
          if (item) {
            const id = uuidv4();
            const contact = getWialonContactByID(item);
            if(contact && contact.length<=0){
              insertContact(id,item);
            }
          }
        })
      }
      if (message) {
        phones.map(item => {
          if (item) {
            sendSimpleWialonNotification(item, message);
          }
        })
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


//getwialongContact by id
/* async function onGetVialonContactByID(req,res){
  console.log('get contact by id');
  const test ='2371234545414455';
  const contact = await getWialonContactByID(test);
  const contactLength = contact.length
  console.log(contact);
  console.log(contactLength);
  return res.status(200).json(contact);
}
 */


//sent consent message template function
async function onSendConsent() {
  console.log('sending consent...');
  await sendTemplateConsent(phoneID,'237655604155');
  await sendTemplateConsent(phoneID,'237699113142');
  const numbers = await ymaneListNumbers();
  const wialonContacts = await getWialonContacts();
  if (numbers.length > 0) {
    numbers.map(async (item) => {
      if (item) {
        await sendTemplateConsent(phoneID, item);
      }
    })

    wialonContacts.map(async (item) => {
      if (item && item.number) {
        await sendTemplateConsent(phoneID, item.number);
      }
    })
  } 
}


function scheduleClock(){
  cron.schedule('35 16 * * *', async () => {
    scheduleFunction = true
  }, {
    scheduled: true,
    timezone: "Africa/Lagos"
  });

  //clear the intervall
  cron.schedule('00 18 * * *', async () => {
    scheduleFunction = false
  }, {
    scheduled: true,
    timezone: "Africa/Lagos"
  });
}

module.exports = {
  onSendMessages,
  onVerification,
  getPositionVehicule,
  onSendNotification,
  onSendEvidence,
  onSendImage,
  onSendTemplateImage,
  onSendTemplateVideo,
  onSendTemplateNotification,
  onSendTemplateVideoMultiple,
  onSendTemplateNotificationMultiple,
  onSendTemplateImageMultiple,
  onSendWialonNotificationMultiple,
  onVerifyContacts,
  onSendConsent,
  scheduleClock,
}