var path = require('path');
var fs = require('fs');

const validator = require('../utils/validator');

var createDirectories = (pathname) => {
    return new Promise((resolve) => {
        var __dirname = process.cwd();
        pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
        fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, (e) => {
            if (e) {
                resolve('')
            } else {
                resolve(path.resolve(__dirname, pathname));
            }
        });
    });
};

var deleteDirectories = (pathname) => {
    return new Promise((resolve) => {
        var __dirname = process.cwd();
        pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
        fs.rmdir(path.resolve(__dirname, pathname), { recursive: true }, e => {
            if (e) {
                resolve(false)
            } else {
                resolve(true);
            }
        });
    });
};

const IsFilePathExist = (path) => {
    return new Promise((resolve) => {
        if (!validator.isValid(path)) {
            resolve('');
        }

        const _currentPath = require('path').resolve(process.cwd(), path);
        if (fs.exists(_currentPath, (exists) => {
            if (exists) {
                resolve(_currentPath);
            } else {
                resolve('');
            }
        }));
    });
};

var createFile = (outputName, config) => {
    return new Promise((resolve) => {      
        fs.writeFile(outputName, JSON.stringify(config), async (err) => {
            if (err) {
                resolve(false)
            } else {
                resolve(true);
            }
        });
    });
};

exports.IsFilePathExist = IsFilePathExist;
exports.createDirectories = createDirectories;
exports.deleteDirectories = deleteDirectories;
exports.createFile = createFile;