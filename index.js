var colors = require('colors');

var main = require('./main');
var common = require('./common');

var params = common.getArgs();
main.onInit(params).then(res => {
    if (res) {
        console.log('\r');
    }
}, (error) => {
    console.error(colors.red(error));
    console.log('\r');
    process.exit();
});