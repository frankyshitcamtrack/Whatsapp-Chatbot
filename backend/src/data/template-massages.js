const { getFakeData } = require("../services/mock");
const { getPositionVehicul } = require("../services/wialon");
const { getPositionVehiculByDate } = require("../services/wialon");

const textMessage = {
  type: "text",
  text: {
    preview_url: false,
    body: `*Welcome to Camtrack ✨😃*\n \n Let us know how we can help you today by choosing from the folowing options:\n\n- Press 1 For vehicle🚗 Location\n- Press 2 Request a visit with a member\n - Press 6 To take a survey`,
  },
};

const genericMessage = {
  type: "text",
  text: {
    preview_url: false,
    body: `Merci pour l'intérêt que vous nous apportez!!! \nVous souhaitez en savoir plus?\nVeuillez contacter l’un des numéros ci-dessous\n\nhttps://wa.me/+237691144331\n\nhttps://wa.me/+237677939002`,
  },
};

const genericMessage2 = {
  type: "text",
  text: {
    preview_url: false,
    body: `Merci pour votre comprehension!!! \nVous souhaitez en savoir plus sur nous?\nVeuillez contacter l’un des numéros ci-dessous\n\nhttps://wa.me/+237691144331\n\nhttps://wa.me/+237677939002`,
  },
};

const textMessageMenu1 = {
  type: "text",
  text: {
    preview_url: false,
    body: "*Vehicle Location🚗*\n \n- Press 1 For last vehicle location\n- Press 2 for vehicle location in a specific date and time",
  },
};

const textMessage2 = {
  type: "text",
  text: {
    preview_url: false,
    body: "location is .....",
  },
};

const textMessage3 = {
  type: "text",
  text: {
    preview_url: false,
    body: "Please enter the specifique Date and time you would like the visite to take place",
  },
};

const askImmatriculation = {
  type: "text",
  text: {
    preview_url: false,
    body: "Please enter your car registration number",
  },
};

const askDateMessage = {
  type: "text",
  text: {
    preview_url: false,
    body: "Please enter the specifique Date and time in this format *yyyy-MM-dd HH:mm:ss*",
  },
};

const validMatricul = {
  type: "text",
  text: {
    preview_url: false,
    body: "Please enter a correct car registration number or enter 0 for the Main menu",
  },
};

const Location = {
  longitude: -122.425332,
  latitude: 37.758056,
  name: "Camtrack Location for",
  address: "1 Hacker Way, Menlo Park, CA 94025",
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

function scheduleMeeting(time, name) {
  return {
    type: "text",
    text: {
      preview_url: false,
      body: `Thanks M. *${name}* for scheduling the visit at *${time}* a Technical member will contact you soon for confirmation`,
    },
  };
}

function notification(text) {
  const notification = {
    type: "text",
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
};
