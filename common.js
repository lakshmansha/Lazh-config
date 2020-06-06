var path = require('path');
var fs = require('fs');

var getArgs = () => {
    var args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach(arg => {
            // long arg
            if (arg.slice(0, 2) === '--') {
                var longArg = arg.split('=');
                var longArgFlag = longArg[0].slice(2, longArg[0].length);
                var longArgValue = longArg.length > 1 ? longArg[1] : true;
                args[longArgFlag] = longArgValue;
            }
            // flags
            else if (arg[0] === '-') {
                var flags = arg.slice(1, arg.length).split('');
                flags.forEach(flag => {
                    args[flag] = true;
                });
            }
        });
    return args;
}


var createDirectories = (pathname, callback) => {
    var __dirname = path.resolve();
    pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
    fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, e => {
        if (e) {
            console.error(e);
            callback(false)
        } else {
            callback(true);
        }
    });
}

var isValid = (value) => {
    var rtnVal = false;
    if (typeof (value) === "string") {
        if (value !== undefined && value !== '') {
            rtnVal = true;
        }
    }

    return rtnVal;
}

exports.getArgs = getArgs;
exports.createDirectories = createDirectories;
exports.isValid = isValid;
