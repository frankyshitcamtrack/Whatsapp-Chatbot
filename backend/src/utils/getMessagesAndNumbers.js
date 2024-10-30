//this function help to filter message and numbers from wialon notifications and send to provided numbers

function getMessagesAndNumbers(req) {
  const arr = Object.keys(req).map((key) => [key, req[key]])[0];
  const message = arr[0].split("whatsapp")[0];
  const whArr = arr[0].split("whatsapp")[1];
  const numbers = whArr.split(":")[1].split(";");
  return { message, numbers };
}

module.exports = { getMessagesAndNumbers };
