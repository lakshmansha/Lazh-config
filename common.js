var path = require('path');
var fs = require('fs');

var logger = require('./helper/logger');
var logic = require('./logic');

const log = new logger.Logger();

log.enableProductionMode();

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


var createDirectories = (pathname) => {
    return new Promise((resolve) => {
        var __dirname = process.cwd();
        pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
        fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, (e) => {
            if (e) {
                log.error(e);
                resolve('')
            } else {
                resolve(path.resolve(__dirname, pathname));
            }
        });
    });   
}

var deleteDirectories = (pathname) => {
    return new Promise((resolve) => {
        var __dirname = process.cwd();
        pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
        fs.rmdir(path.resolve(__dirname, pathname), { recursive: true }, e => {
            if (e) {
                console.error(e);
                resolve(false)
            } else {
                resolve(true);
            }
        });
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

var isObjValid = (value) => {
    var rtnVal = false;
    if (value !== undefined && value !== null) {
        if (Object.keys(value).length > 0) {
            rtnVal = true;
        }
    }

    return rtnVal;
}


exports.getArgs = getArgs;
exports.createDirectories = createDirectories;
exports.isValid = isValid;
exports.isObjValid = isObjValid;
exports.deleteDirectories = deleteDirectories;
