const { version } = require('../package.json')

module.exports = (args, log) => {
  log.info(`Current Version : ${version}`);
  log.info('\r');
}