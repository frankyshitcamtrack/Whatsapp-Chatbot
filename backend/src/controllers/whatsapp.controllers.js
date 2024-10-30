const path = require("path");
const {
  sendMessages,
  sendTemplateConsent,
  sendMediaImage,
  sendMediaVideo,
  sendUtilityTemplateImage,
  sendTemplateVideo,
  sendTemplateNotification,
  sendTemplateImageMultiple,
  sendTemplateNotificationMultiple,
  sendTemplateVideoMultiple,
  verifyContacts,
  ymaneListNumbers,
} = require("../models/whatsapp.model");

const { getWialonContacts } = require("../models/wialon.model");
const { phoneFormat, formatArrPhones } = require("../utils/fortmat-phone");
const { developement } = require("../config/whatsappApi");
const { downloadVideo } = require("../utils/download");
const { downloadImage } = require("../utils/downloadImg");
const { v4: uuidv4 } = require("uuid");

const phoneID = developement.phone_number_id;

//verify contact
async function onVerifyContacts(req, res) {
  try {
    const arrPhones = req.body.phones;
    const phone = phoneFormat(arrPhones);
    console.log(arrPhones);
    console.log(phone);
    if (phone) {
      const verification = await verifyContacts(phone);
      console.log(verification);
      return res.status(200).json({ result: verification });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error); // print the error to console
    return res.status(500).send("Post received, but we have an error!");
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

//sent consent message
async function onSendConsentSingle(req, res) {
  console.log("sending consent message");
  try {
    const phoneID = developement.phone_number_id;
    const phone = phoneFormat(req.body.phone);
    console.log(phoneID);
    console.log(phone);
    if (phoneID && phone) {
      await sendTemplateConsent(phoneID, phone);
      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error); // print the error to console
    return res.status(500).send("Post received, but we have an error!");
  }
}

async function onSendNotification(req, res) {
  try {
    const phoneID = developement.phone_number_id;
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;
    const me = message.replace(/\r?\\n|\r/g, "\n");

    if (phoneID && phone && message) {
      await sendMessages(phoneID, phone, me);
      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error); // print the error to console
    return res.status(500).send("Post received, but we have an error!");
  }
}

async function onSendEvidence(req, res) {
  try {
    const phone = phoneFormat(req.body.phone);
    const media = req.body.link;
    const message = req.body.message;
    if (phoneID && phone && media) {
      setTimeout(async () => {
        await sendMediaVideo(phoneID, phone, media, message);
      }, 10000);
      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error); // print the error to console
    return res.status(500).send("Post received, but we have an error!");
  }
}

async function onSendImage(req, res) {
  try {
    const phoneID = developement.phone_number_id;
    const phone = phoneFormat(req.body.phone);
    const media = req.body.link;
    if (phoneID && phone && media) {
      await sendMediaImage(phoneID, phone, media);
      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error); // print the error to console
    return res.status(500).send("Post received, but we have an error!");
  }
}

async function onSendTemplateImage(req, res) {
  try {
    const phoneID = developement.phone_number_id;
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;
    const img = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get("host");
    const fullUrl = `${protocol}://${hostname}`;
    const downloadImId = uuidv4();
    const downloadPath = `public/assets/evidence/${downloadImId}.jpg`;
    const media = await downloadImage(img, downloadPath, fullUrl);
    if (phoneID && phone && media) {
      console.log(media);
      setTimeout(async () => {
        await sendUtilityTemplateImage(phoneID, phone, message, media);
        res.json(200);
      }, 10000);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error);
    return res.status(500).send("Post received, but we have an error!");
  }
}

async function onSendTemplateNotification(req, res) {
  try {
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;
    if (phoneID && phone && message) {
      await sendTemplateNotification(phoneID, phone, message);
      res.send(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error);
    return res.status(500).send("Post received, but we have an error!");
  }
}

//send single template
async function onSendTemplateVideo(req, res) {
  try {
    const phone = phoneFormat(req.body.phone);
    const message = req.body.message;
    const url = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get("host");
    const fullUrl = `${protocol}://${hostname}`;
    const downloadVidId = uuidv4();
    const downloadPath = path.resolve(
      `public/assets/video/${downloadVidId}.mp4`
    );
    const video = await downloadVideo(url, downloadPath, fullUrl);
    if (phoneID && phone && video) {
      setTimeout(async () => {
        await sendTemplateVideo(phoneID, phone, message, video);
        res.send(200);
      }, 15000);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error);
    return res.status(500).send("Post received, but we have an error!");
  }
}

async function onSendTemplateImageMultiple(req, res) {
  try {
    const phoneID = developement.phone_number_id;

    const phoneArr = JSON.parse(req.body.phones.replace(/'/g, '"'));
    const phones = formatArrPhones(phoneArr);

    const message = req.body.message;

    const img = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get("host");
    const fullUrl = `${protocol}://${hostname}`;

    const downloadImId = uuidv4();
    const downloadPath = `public/assets/evidence/${downloadImId}.jpg`;

    const media = await downloadImage(img, downloadPath, fullUrl);

    if (phoneID && phones && media) {
      setTimeout(async () => {
        await sendTemplateImageMultiple(phoneID, phones, message, media);
      }, 15000);
      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error);
    return res.status(500).send("Post received, but we have an error!");
  }
}

async function onSendTemplateVideoMultiple(req, res) {
  try {
    const phoneArr = JSON.parse(req.body.phones.replace(/'/g, '"'));
    const phones = formatArrPhones(phoneArr);
    const message = req.body.message;

    const url = req.body.link;
    const protocol = req.protocol;
    const hostname = req.get("host");
    const fullUrl = `${protocol}://${hostname}`;

    const downloadVidId = uuidv4();
    const downloadPath = path.resolve(
      `public/assets/video/${downloadVidId}.mp4`
    );

    const video = await downloadVideo(url, downloadPath, fullUrl);

    if (phoneID && phones && video) {
      setTimeout(async () => {
        await sendTemplateVideoMultiple(phoneID, phones, message, video);
      }, 15000);

      res.send(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error);
    return res.status(500).send("Post received, but we have an error!");
  }
}

async function onSendTemplateNotificationMultiple(req, res) {
  try {
    const phoneArr = JSON.parse(req.body.phones.replace(/'/g, '"'));
    const phones = formatArrPhones(phoneArr);
    const message = req.body.message.toString();
    if (phoneID && phones && message) {
      await sendTemplateNotificationMultiple(phoneID, phones, message);
      res.send(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error("error of: ", error);
    return res.status(500).send("Post received, but we have an error!");
  }
}

//sent consent message template function
async function onSendConsent() {
  console.log("sending consent...");
  const numbers = await ymaneListNumbers();
  const wialonContacts = await getWialonContacts();
  if (numbers.length > 0) {
    numbers.map(async (item) => {
      if (item) {
        await sendTemplateConsent(phoneID, item);
      }
    });

    wialonContacts.map(async (item) => {
      if (item && item.number) {
        await sendTemplateConsent(phoneID, item.number);
      }
    });
  }
}

module.exports = {
  onVerification,
  onSendNotification,
  onSendEvidence,
  onSendImage,
  onSendTemplateImage,
  onSendTemplateVideo,
  onSendTemplateNotification,
  onSendTemplateVideoMultiple,
  onSendTemplateNotificationMultiple,
  onSendTemplateImageMultiple,
  onVerifyContacts,
  onSendConsent,
  onSendConsentSingle,
};
