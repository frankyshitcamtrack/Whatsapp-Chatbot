const { sendMessages } = require('../../models/whatsapp.model');
const { phoneFormat } = require('../../utils/fortmat-phone');
const dateInYyyyMmDdHhMmSs = require('../../utils/dateFormat');

const {
  genericMessage2,
  textMessageMenu1,
  scheduleMeeting,
  textMessage,
  textMessage3,
  askImmatriculation,
  getLocation,
  askDateMessage,
  getLocationByDate,
  genericMessage,
  chooseLanguage,
} = require('../../data/template-massages');

let users = [];

// Send vehicule location function
async function getPositionVehicule(user) {
  const location = await getLocation(user.vehicleNumber)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  if (location && location.code < 0) {
    const message =
      user.lang === '0'
        ? `${location.status} \n Please enter a valid matricul number`
        : `${location.status} \n  Veuillez saisir un numéro de matricule valide`;
    await sendMessages(user.phoneId, user.phone, message);
    user.previewMessage = '1';
    user.flow = '1';
  } else if (location && location.code > 0) {
    let vehiculLocation = {
      address: location.lastposition,
      latitude: location.lats,
      longitude: location.longs,
      name: `${location.lats},${location.longs}`,
      dates: location.dates,
    };
    if (vehiculLocation.latitude && vehiculLocation.longitude) {
      let repportDate = new Date(vehiculLocation.dates);
      let date = dateInYyyyMmDdHhMmSs(repportDate);
      let link = `https://www.google.com/maps/place/${vehiculLocation.latitude}+${vehiculLocation.longitude}`;
      let message =
        user.lang === '0'
          ? `*Vehicle* : ${user.vehicleNumber}\n\n*Last known position* :  ${vehiculLocation.address}\n\n*Report time* : ${date}\n\n*Link* : ${link}`
          : `*Vehicule* : ${user.vehicleNumber}\n\n*Dernière position connue* :  ${vehiculLocation.address}\n\n*Heure du rapport* : ${date}\n\n*Lien* : ${link}`;

      //sendLocation(phoneId,phone,vehiculLocation)
      await sendMessages(user.phoneId, user.phone, message);
      user.previewMessage = '';
      user.flow = '';
      user.vehicleNumber = '';
      user.dates = '';
      user.lang = '';
      user.body = '';
      user.scheduleMessageSent = false;
      user.matriculeQuestionSent = false;
      user.dateMessage = false;
      console.log(user);
    }
  } else {
    const message =
      user.lang === '0'
        ? 'An error has occurred with our server. Please wait a few minutes and try again.'
        : `Une erreur s'est produite avec notre serveur. Veuillez patienter quelques minutes et réessayer.`;
    await sendMessages(user.phoneId, user.phone, message);

    user.previewMessage = '';
    user.flow = '';
    user.vehicleNumber = '';
    user.dates = '';
    user.lang = '';
    user.scheduleMessageSent = false;
    user.matriculeQuestionSent = false;
    user.dateMessage = false;
  }
}

//Send vehicle location by specific date
async function getPositionVehicleByDate(user) {
  const location = await getLocationByDate(user.date, user.vehicleNumber)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  if (location && location.code < 0) {
    const message = `${location.status}`;
    await sendMessages(user.phoneId, user.phone, message);
    user.previewMessage = '';
    user.flow = '';
    user.vehicleNumber = '';
    user.dates = '';
    user.lang = '';
    user.scheduleMessageSent = false;
    user.matriculeQuestionSent = false;
    user.dateMessage = false;
  } else if (location && location.code > 0) {
    let vehiculLocation = {
      address: location.lastposition,
      latitude: location.lats,
      longitude: location.longs,
      name: `${location.lats},${location.longs}`,
      dates: location.dates,
    };
    if (vehiculLocation.latitude && vehiculLocation.longitude) {
      let newDate = new Date(vehiculLocation.dates);
      let date = dateInYyyyMmDdHhMmSs(newDate);
      let link = `https://www.google.com/maps/place/${vehiculLocation.latitude}+${vehiculLocation.longitude}`;
      let message =
        user.lang === '0'
          ? `*Vehicle* : ${user.vehicleNumber}\n\n*Last known position* :  ${vehiculLocation.address}\n\n*Report time* : ${date}\n\n*Link* : ${link}`
          : `*Vehicule* : ${user.vehicleNumber}\n\n*Dernière position connue* :  ${vehiculLocation.address}\n\n*Heure du rapport* : ${date}\n\n*Lien* : ${link}`;

      await sendMessages(user.phoneId, user.phone, message);

      user.previewMessage = '';
      user.flow = '';
      user.vehicleNumber = '';
      user.dates = '';
      user.lang = '';
      user.scheduleMessageSent = false;
      user.matriculeQuestionSent = false;
      user.dateMessage = false;
    }
  } else {
    user.lang === '0'
      ? 'An error has occurred with our server. Please wait a few minutes and try again.'
      : `Une erreur s'est produite avec notre serveur. Veuillez patienter quelques minutes et réessayer.`;
    await sendMessages(user.phoneId, user.phone, message);

    user.previewMessage = '';
    user.flow = '';
    user.vehicleNumber = '';
    user.dates = '';
    user.lang = '';
    user.scheduleMessageSent = false;
    user.matriculeQuestionSent = false;
    user.dateMessage = false;
  }
}

//Send whatsapp message
async function onSendMessages(req, res) {
  //console.log(res);
  try {
    if (
      req.body.object &&
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0].value &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.contacts
    ) {
      let entryID = req.body.entry[0].id;
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id; // extract the phone numberId from the webhook payload
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number text from the webhook payload
      let body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payloa
      let name = req.body.entry[0].changes[0].value.contacts[0].profile.name; // extract the name from the webhook payloa

      const findIndex = users.findIndex((item) => item.name === name);
      const phone = phoneFormat(from);

      // check if the user client index is not exist in the table user table and finally add the new user
      if (
        findIndex < 0 &&
        body.toLowerCase() !== 'start' &&
        body.toLowerCase() !== 'ok'
      ) {
        await sendMessages(phone_number_id, phone, genericMessage.text.body);
      }

      if (findIndex < 0 && body.toLowerCase() === 'ok') {
        await sendMessages(phone_number_id, phone, genericMessage2.text.body);
      }

      // check if the user client index is not exist in the table user table and finally add the new user
      if (findIndex < 0 && body.toLowerCase() === 'start') {
        const newUser = {
          id: entryID,
          name: name,
          phone: phone,
          phoneId: phone_number_id,
          body: body,
          vehicleNumber: '',
          date: '',
          time: '',
          flow: '',
          lang: '',
          previewMessage: 'start',
          scheduleMessageSent: false,
          matriculeQuestionSent: false,
          dateMessage: false,
        };
        users.push(newUser);

        await sendMessages(phone_number_id, phone, chooseLanguage.text.body);
      }

      if (
        findIndex >= 0 &&
        body.toLowerCase() === '00' &&
        users[findIndex].previewMessage === 'start'
      ) {
        users[findIndex].lang = body;
        const menuMessage = textMessage('00');
        await sendMessages(phone_number_id, phone, menuMessage.text.body);
      }

      if (
        findIndex >= 0 &&
        body.toLowerCase() === '0' &&
        users[findIndex].previewMessage === 'start'
      ) {
        users[findIndex].lang = body;
        const menuMessage = textMessage('0');
        await sendMessages(phone_number_id, phone, menuMessage.text.body);
      }

      if (findIndex >= 0 && body.toLowerCase() === 'start') {
        await sendMessages(phone_number_id, phone, textMessage.text.body);
      }

      if (findIndex >= 0) {
        // check if the user client index exist in the table user table
        const user = users[findIndex]; // find the user by his index
        const userLanguage = user.lang;
        user.body = body;

        switch (true) {
          case user.body === '1' &&
            user.previewMessage === 'start' &&
            user.flow === '': {
            const firstMenu = textMessageMenu1(userLanguage);
            user.previewMessage = user.body;
            user.flow = '1';
            await sendMessages(user.phoneId, user.phone, firstMenu.text.body);
            break;
          }

          case user.flow === '1' &&
            user.previewMessage === '1' &&
            user.body === '2': {
            const askMatriculMessage = askImmatriculation(userLanguage);
            await sendMessages(
              user.phoneId,
              user.phone,
              askMatriculMessage.text.body
            );
            user.previewMessage = '2';
            user.matriculeQuestionSent = true;
            break;
          }

          case user.flow === '1' &&
            user.previewMessage === '1' &&
            user.body === '1' &&
            user.matriculeQuestionSent === false: {
            const askMatriculMessage = askImmatriculation(userLanguage);
            await sendMessages(
              user.phoneId,
              user.phone,
              askMatriculMessage.text.body
            );
            user.matriculeQuestionSent = true;
            user.previewMessage = '1';
            break;
          }

          case user.flow === '1' &&
            user.previewMessage === '1' &&
            user.body !== '1' &&
            user.matriculeQuestionSent === false: {
            const vehicleLocationMessage = textMessageMenu1(userLanguage);
            await sendMessages(
              user.phoneId,
              user.phone,
              vehicleLocationMessage.text.body
            );
            break;
          }

          case user.flow === '1' &&
            user.previewMessage === '1' &&
            user.body !== '2' &&
            user.matriculeQuestionSent === false: {
            const vehicleLocationMessage = textMessageMenu1(userLanguage);
            await sendMessages(
              user.phoneId,
              user.phone,
              vehicleLocationMessage.text.body
            );
            break;
          }

          case user.flow === '1' &&
            user.previewMessage === '1' &&
            user.matriculeQuestionSent === true &&
            user.dateMessage === false: {
            user.vehicleNumber = user.body.replace(/\s+/g, '');
            await getPositionVehicule(user);
            break;
          }

          case user.flow === '1' &&
            user.previewMessage === '2' &&
            user.matriculeQuestionSent === true &&
            user.dateMessage === false: {
            let vehicleImmat = user.body;
            user.vehicleNumber = vehicleImmat.replace(/\s+/g, '');
            const dateMessage = askDateMessage(userLanguage);
            await sendMessages(user.phoneId, user.phone, dateMessage.text.body);
            user.dateMessage = true;
            break;
          }

          case user.flow === '1' &&
            user.previewMessage === '2' &&
            user.dateMessage === true &&
            user.matriculeQuestionSent === true: {
            user.date = user.body;
            await getPositionVehicleByDate(user);
            break;
          }

          case user.body === '2' &&
            user.previewMessage === 'start' &&
            user.flow === '' &&
            user.dateMessage === false &&
            user.matriculeQuestionSent === false &&
            user.scheduleMessageSent === false: {
            user.previewMessage = user.body;
            const dateAndTimeMessage = textMessage3(userLanguage);
            await sendMessages(
              user.phoneId,
              user.phone,
              dateAndTimeMessage.text.body
            );
            user.scheduleMessageSent = true;
            break;
          }

          case user.previewMessage === '2' &&
            user.scheduleMessageSent === true &&
            user.flow === '' &&
            user.dateMessage === false &&
            user.matriculeQuestionSent === false: {
            user.body = body;
            const visit = scheduleMeeting(user.body, user.name, userLanguage);
            await sendMessages(user.phoneId, user.phone, visit.text.body);
            user.previewMessage = '';
            user.scheduleMessageSent = false;
            break;
          }

          default:
        }
      }

      res.json(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('error of: ', error); // print the error to console
    return res.status(500).send('Post received, but we have an error!');
  }
}

module.exports = { onSendMessages };
