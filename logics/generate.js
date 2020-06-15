const colors = require('colors');

const config = require('./config');

const validator = require('../utils/validator');
const directory = require('../utils/directory');

module.exports = async (path, app, env, output, log, IsTest) => {
    return new Promise(async (resolve) => {
        if (validator.isValid(output)) {
            file_directory = output;
        } else {
            file_directory = `.\\dist\\${app}\\${env}`;
        }

        if (!validator.isValid(path)) { resolve('Pass the Configuration Path to generate Config.'); return; }

        const _path = await directory.IsFilePathExist(path);
        if (!validator.isValid(_path)) {
            resolve('Please provide the Valid Configuration Path');
            return;
        }

        log.info(`${colors.green("Config Path")}: ${colors.bgGreen(path)}`);
        log.info('\r');

        if (!validator.isValid(app)) { resolve('Pass the Parameter App to generate Config.'); return; }
        const _app = config.IsAppExist(app, _path);
        if (!_app) {
            resolve('Please provide the Valid App Name');
            return;
        }

        log.info(`${colors.green("Current App Name is")} ${colors.bgGreen(app)}`);


        if (!validator.isValid(env)) { resolve('Pass the Parameter Env to generate Config.'); return; }
        const _env = config.IsEnvExist(app, env, _path);
        if (!_env) {
            resolve('Please provide the Valid Envirnoment Name');
            return;
        }

        log.info(`${colors.green("Current Env Name is")} ${colors.bgGreen(env)}`);
        log.info('\r');

        var _config = await config.generateConfig(app, env, _path);

        if (validator.isValid(_config.message)) {
            resolve(_config.message);
            return;
        }

        log.info('\r');

        log.info(`${colors.green("Configuration")} Stored for ${colors.green(app + ' App')} on ${colors.green("Env")}: ${colors.bgGreen(env)}`);
        log.info('\r');
        log.info(`${colors.gray(JSON.stringify(_config, null, 4))}`);
        log.info('\r');

        log.info(`${colors.magenta("Generating Config File (JSON) Initialized")}`);
        if (validator.isDefined(IsTest)) {
            resolve(true);            
        } else {
            const folder_path = await directory.createDirectories(file_directory);
            if (validator.isValid(folder_path)) {
                var file_outputName = `${folder_path}\\config.json`;
                log.info(`${colors.magenta("Created Configuration File Path for Envirnonment")}`);

                const isSuccess = await directory.createFile(file_outputName, _config);

                if (isSuccess) {
                    log.info(`${colors.magenta("Generated Config File (JSON) Completed.")}`);
                    log.info('\r');

                    const search = '/';
                    const replacer = new RegExp(search, 'g');

                    var dir_path = file_outputName.replace(replacer, '\\');
                    log.info(`${colors.green("Generated File Located Path")}: ${colors.green(dir_path)}`);
                    log.info('\r');
                    
                    const isExist = await directory.IsFilePathExist('/temp');
                    let rmstatus = false;
                    if (validator.isValid(isExist)) {
                        rmstatus = await directory.deleteDirectories('/temp');
                        resolve(true);
                    } else {
                        resolve(true);
                    }
                } else {
                    resolve('Error on Create Configuration File. ');
                }
            } else {
                resolve('Unable to Create Configuration File Path ');
            }
        }
    });
}