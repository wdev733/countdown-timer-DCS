export function getFormattedDateTime(date = new Date()) {
  return `${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${padLeadingZero(
    date.getMinutes()
  )}:${padLeadingZero(date.getSeconds())}`;
}

export function padLeadingZero(value) {
  return value > 9 ? value : `0${value}`;
}

export function milliSecondsToMMSS(seconds) {
  const minutes = Math.floor(seconds / 60 / 1000);
  const remainSeconds = (seconds % (60 * 1000)) / 1000;

  return `${padLeadingZero(minutes)}:${padLeadingZero(remainSeconds)}`;
}
