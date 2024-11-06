function formatMessage(message) {
  const format = message
    .toString()
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/gi, "")
    .replace(/ >/g, ">")
    .replace(/> </g, "><")
    .trim();
  console.log(format);
  return format;
}

module.exports = { formatMessage };
