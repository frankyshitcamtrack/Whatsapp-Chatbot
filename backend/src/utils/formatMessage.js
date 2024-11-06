function formatMessage(message) {
  const format = message
    .toString()
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/gi, "")
    .replace(/ >/g, ">")
    .replace(/> </g, "><")
    .trim();

  return format;
}

module.exports = { formatMessage };
