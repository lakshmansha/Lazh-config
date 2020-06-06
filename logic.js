var fs = require('fs');

const getConfig = (app, env, path) => {
    const inputs = getInputs(path);
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
    }

    let config = {};
    if (envirnments.length > 0) {
        config = envirnments[0].EnvConfig;
        Envirnoment = envirnments[0].EnvName;
    }

    config.AppName = AppName;
    config.Envirnoment = Envirnoment.toUpperCase();

    return config;
};

const getInputs = (path) => {
    const _currentPath = require('path').resolve(__dirname, path);
    return require(_currentPath);
}

exports.getConfig = getConfig;
