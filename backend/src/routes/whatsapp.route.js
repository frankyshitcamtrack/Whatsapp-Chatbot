const express = require("express");

const {
  onSendMessages,
} = require("../controllers/whatsapp-controller/whatsappChatbot.controller");

const {
  onSendWialonNotificationMultiple,
} = require("../controllers/whatsapp-controller/wialonNotification.controller");

const {
  onSendConsentSingle,
  onVerifyContacts,
  onVerification,
  onSendNotification,
  onSendEvidence,
  onSendImage,
  onSendTemplateImage,
  onSendTemplateVideo,
  onSendTemplateNotification,
  onSendTemplateImageMultiple,
  onSendTemplateNotificationMultiple,
  onSendTemplateVideoMultiple,
} = require("../controllers/whatsapp-controller/ymaneBulk.controller");

const whatsappRouter = express.Router();

// Accepts POST requests at /webhook endpoint
whatsappRouter.post("/", onSendMessages);

// Accepts POST requests for notification or alert
whatsappRouter.post("/utility_notification", onSendNotification);

// Accepts POST requests for evidences or alert
whatsappRouter.post("/utility_video", onSendEvidence);

// Accepts POST requests for evidences or alert
whatsappRouter.post("/utility_image", onSendImage);

//verify contacts
whatsappRouter.post("/verify_contacts", onVerifyContacts);

// Accepts POST requests for evidencesVideo template or alert
whatsappRouter.post("/marketing_video", onSendTemplateVideo);

// Accepts POST requests for bulkevidencesVideo template or alert
whatsappRouter.post("/bulk_marketing_video", onSendTemplateVideoMultiple);

// Accepts POST requests for evidencesImage template or alert
whatsappRouter.post("/marketing_image", onSendTemplateImage);

// Accepts POST requests for bulkevidencesImage template or alert
whatsappRouter.post("/bulk_marketing_image", onSendTemplateImageMultiple);

// Accepts POST requests for evidencesImage template or alert
whatsappRouter.post("/marketing_notification", onSendTemplateNotification);

// Accepts POST requests for evidencesImage template or alert
whatsappRouter.post(
  "/bulk_marketing_notification",
  onSendTemplateNotificationMultiple
);

//wialon notifications
whatsappRouter.post("/wialon_notifications", onSendWialonNotificationMultiple);

//consent message
whatsappRouter.post("/consent", onSendConsentSingle);

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
whatsappRouter.get("/", onVerification);

//test
//whatsappRouter.get('/contact', onGetVialonContactByID);

module.exports = whatsappRouter;
