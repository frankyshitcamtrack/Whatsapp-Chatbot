const { language } = require('googleapis/build/src/apis/language');
const { getFakeData } = require('../services/mock');
const { getPositionVehicul } = require('../services/wialon');
const { getPositionVehiculByDate } = require('../services/wialon');

const chooseLanguage = {
  type: 'text',
  text: {
    preview_url: false,
    body: `*Welcome to Camtrack ✨😃*\n \n Please choose a language:\n *0* for English\n *00* for French`,
  },
};

const textMessage = (language) => {
  if (language === '0') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: `*Welcome to Camtrack ✨😃*\n \n Let us know how we can help you today by choosing from the folowing options:\n\n *1* For vehicle🚗 Location\n *2* Request a visit with a member\n *6* To take a survey`,
      },
    };
  }

  if (language === '00') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: `*Bienvenue chez Camtrack ✨😃* \n Faites-nous savoir comment nous pouvons vous aider aujourd'hui en choisissant parmi les options suivantes:\n *1* pour connaitre la position de votre véhicule🚗 \n *2* Pour demander une visite avec un de nos membres \n *6* Pour répondre à un sondage`,
      },
    };
  }
};

const genericMessage = {
  type: 'text',
  text: {
    preview_url: false,
    body: `Salut et Merci pour l'intérêt que vous nous apportez!!! \nVous souhaitez en savoir plus sur nous?\nVeuillez contacter l’un des numéros ci-dessous\n\nhttps://wa.me/+237691144331\n\nhttps://wa.me/+237677939002 ou alors saisissez le mot *start* pour demarrer le chatbot`,
  },
};

const genericMessage2 = {
  type: 'text',
  text: {
    preview_url: false,
    body: `Merci pour votre comprehension!!! \nVous souhaitez en savoir plus sur nous?\nVeuillez contacter l’un des numéros ci-dessous\nhttps://wa.me/+237691144331\n\nhttps://wa.me/+237677939002`,
  },
};

const textMessageMenu1 = (language) => {
  if (language === '0') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: '*Vehicle Location🚗*\n \n *1* For last vehicle location\n *2* for vehicle location in a specific date and time',
      },
    };
  }

  if (language === '00') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: '*Localisation du Vehicule🚗*\n *1* pour la dernière localisation du véhicule\n *2* pour la localisation du véhicule à une date et une heure précise',
      },
    };
  }
};

const textMessage2 = (language) => {
  if (language === '0') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: 'location is ...',
      },
    };
  }

  if (language === '00') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: 'L emplacement est ...',
      },
    };
  }
};

const textMessage3 = (language) => {
  if (language === '0') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: 'Please enter the specifique Date and time you would like the visite to take place',
      },
    };
  }

  if (language === '00') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: "Veuillez saisir la date et l 'heure précises auxquelles vous souhaitez que la visite ait lieu.",
      },
    };
  }
};

const askImmatriculation = (language) => {
  if (language === '0') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: 'Please enter your car registration number',
      },
    };
  }

  if (language === '00') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: "Veuillez saisir le numéro d'immatriculation de votre véhicule",
      },
    };
  }
};

const askDateMessage = (language) => {
  if (language === '0') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: 'Please enter the specifique Date and time in this format *yyyy-MM-dd HH:mm:ss*',
      },
    };
  }
  if (language === '00') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: "Veuillez saisir la date et l 'heure spécifiques dans ce format *aaaa-MM-dd HH:mm:ss*.",
      },
    };
  }
};

const validMatricul = (language) => {
  if (language === '0') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: 'Please enter a correct car registration number or enter 0 for the Main menu',
      },
    };
  }
  if (language === '00') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: "Veuillez saisir un numéro d 'immatriculation correct ou entrer 0 pour le menu principal.",
      },
    };
  }
};

function scheduleMeeting(time, name, language) {
  if (language === '0') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: `Thanks M. *${name}* for scheduling the visit at *${time}* a Technical member will contact you soon for confirmation`,
      },
    };
  }

  if (language === '00') {
    return {
      type: 'text',
      text: {
        preview_url: false,
        body: `Merci M. *${name}* pour avoir programmé la visite à *${time}* un membre du service technique vous contactera bientôt pour confirmation.`,
      },
    };
  }
}

const Location = {
  longitude: -122.425332,
  latitude: 37.758056,
  name: 'Camtrack Location for',
  address: '1 Hacker Way, Menlo Park, CA 94025',
};

async function serverMessage() {
  const text = await getFakeData()
    .then((res) => res.data[0])
    .catch((err) => console.log(err));
  return { preview_url: false, body: text };
}

async function getLocation(matricul) {
  const positionVehicul = await getPositionVehicul(matricul);
  return positionVehicul;
}

async function getLocationByDate(date, matricul) {
  const positionVehicul = await getPositionVehiculByDate(date, matricul);
  return positionVehicul;
}

function notification(text) {
  const notification = {
    type: 'text',
    text: { preview_url: false, body: text },
  };
  return notification;
}

module.exports = {
  genericMessage2,
  notification,
  textMessageMenu1,
  scheduleMeeting,
  textMessage,
  textMessage2,
  textMessage3,
  serverMessage,
  askImmatriculation,
  validMatricul,
  Location,
  getLocation,
  getLocationByDate,
  askDateMessage,
  genericMessage,
  chooseLanguage,
};
