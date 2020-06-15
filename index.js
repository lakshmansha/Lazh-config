const minimist = require('minimist');
var logger = require('@lazh/logger');

const error = require('./utils/error');

const log = new logger.Logger();
const LogLevel = logger.LogLevel;

module.exports = () => {
    log.enableProductionMode(LogLevel.Info);
    const args = minimist(process.argv.slice(2));
    let cmd = args._[0] || 'help'

    if (args.version || args.v) {
        cmd = 'version'
    }

    if (args.help || args.h) {
        cmd = 'help'
    }

    switch (cmd) {
        case 'generate':
            require('./cmds/generate')(args, log);
            break;

        case 'version':
            require('./cmds/version')(args, log);
            break;

        case 'help':
            require('./cmds/help')(args, log);
            break;

        default:
            error(`"${cmd}" is not a valid command!`, log);
            break;
    }
};