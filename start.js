var colors = require('colors');

var logger = require('./helper/logger');
const log = new logger.Logger();

var main = require('./main');
var common = require('./common');

async function Init() {
    log.enableProductionMode();
    var params = common.getArgs();    
    main.onInit(params).then(res => {
        if (res) {
            log.info('\r');
        }
    }, (error) => {
        log.error(colors.red(error));
        log.info('\r');
        process.exit();
    });
}

exports.Init = Init;