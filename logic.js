const _path = require('path');
const fs = require('fs');

var common = require('./common');

const getConfig = async (app, env, path) => {
    const _path = await getFilePath(path);
    let config = {};
    let message = '';

    const inputs = require(_path);
    if (inputs.length > 0) {
        let AppName = "";
        let Envirnoment = "";
        const env_Config = inputs.filter((obj) => {
            return obj.Code === app;
        });

        let envirnments = [];

        if (env_Config.length > 0) {
            envirnments = env_Config[0].Envirnoments.filter((obj) => {
                return obj.EnvName === env;
            });
            AppName = env_Config[0].Name;
        } else {
            message = 'Please provide the Valid App Name';
            config.message = message;
            return config;
        }

        if (envirnments.length > 0) {
            config = envirnments[0].EnvConfig;
            Envirnoment = envirnments[0].EnvName;
        } else {
            message = 'Please provide the Valid Env Name';
            config.message = message;
            return config;
        }
        config.AppName = AppName;
        config.Envirnoment = Envirnoment.toUpperCase();
        config.message = '';
    } else {
        message = 'Please provide the Valid Configuration Path';
        config.message = message;
        return config;
    }

    return config;
};

const IsAppExist = (app, _path) => {
    const inputs = require(_path);
    if (inputs.length > 0) {
        let AppName = "";
        let Envirnoment = "";
        const env_Config = inputs.filter((obj) => {
            return obj.Code === app;
        });

        if (env_Config.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}

const IsEnvExist = (app, env, _path) => {
    const inputs = require(_path);
    const env_Config = inputs.filter((obj) => {
        return obj.Code === app;
    });

    let envirnments = [];

    if (env_Config.length > 0) {
        envirnments = env_Config[0].Envirnoments.filter((obj) => {
            return obj.EnvName === env;
        });
    }

    if (envirnments.length > 0) {
        return true;
    } else {
        return false;
    }
}

const generateConfig = (app, env, _path) => {
    let config = {};
    let message = '';

    const inputs = require(_path);
    if (inputs.length > 0) {
        let AppName = "";
        let Envirnoment = "";
        const env_Config = inputs.filter((obj) => {
            return obj.Code === app;
        });

        let envirnments = [];

        if (env_Config.length > 0) {
            envirnments = env_Config[0].Envirnoments.filter((obj) => {
                return obj.EnvName === env;
            });
            AppName = env_Config[0].Name;
        } else {
            message = 'Please provide the Valid App Name';
            config.message = message;
            return config;
        }


        if (envirnments.length > 0) {
            config = envirnments[0].EnvConfig;
            Envirnoment = envirnments[0].EnvName;
        } else {
            message = 'Please provide the Valid Env Name';
            config.message = message;
            return config;
        }
        config.AppName = AppName;
        config.Envirnoment = Envirnoment.toUpperCase();
        config.message = '';
    } else {
        message = 'Please provide the Valid Configuration Path';
        config.message = message;
        return config;
    }

    return config;
}

const getFilePath = (path) => {
    return new Promise((resolve) => {
        if (!common.isValid(path)) {
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
}

exports.getConfig = getConfig;
exports.getFilePath = getFilePath;
exports.IsAppExist = IsAppExist;
exports.IsEnvExist = IsEnvExist;
exports.generateConfig = generateConfig;
