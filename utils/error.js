const colors = require('colors');

module.exports = (message, log, exit) => {
  log.error(colors.red(message));
  log.info('\r');
  exit && process.exit(1);
}