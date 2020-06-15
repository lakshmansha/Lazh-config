var fs = require('fs');
var colors = require('colors');

const validator = require('./utils/validator');
const directory = require('./utils/directory');

var common = require('./common');
var logic = require('./logic');

const log = new logger.Logger();
const LogLevel = logger.LogLevel;

log.enableProductionMode(LogLevel.Info);

async function onInit(params) {
    return new Promise(async (resolve, reject) => {
        try {
            var file_directory =  "";             
            var output = params['output'];

            if(validator.isValid(output)) {
                file_directory = output;                   
            } else {
                file_directory = `.\\dist\\${params['app']}\\${params['env']}`;
            }

            var path = params['path'];
            if (!validator.isValid(path)) { reject('Pass the Configuration Path to generate Config. eg: --path=path/env-input.json'); return; }
            const _path = await directory.IsFilePathExist(path);
            if (!validator.isValid(_path)) {
                reject('Please provide the Valid Configuration Path');
                return;
            }

            log.info(`${colors.green("Config Path")}: ${colors.bgGreen(path)}`);
            log.info('\r');

            var app = params['app'];
            if (!validator.isValid(app)) { reject('Pass the Parameter App to generate Config. eg: --app=<app>'); return; }
            const _app = logic.IsAppExist(app, _path);
            if (!_app) {
                reject('Please provide the Valid App Name');
                return;
            }

            log.info(`${colors.green("App Name")} : ${colors.bgGreen(app)}`);

            var envs = params['env'];
            if (!validator.isValid(envs)) { reject('Pass the Parameter Env to generate Config. eg: --env=<env>'); return; }
            const _env = logic.IsEnvExist(app, envs, _path);
            if (!_env) {
                reject('Please provide the Valid Envirnoment Name');
                return;
            }

            log.info(`${colors.green("Env Name")}: ${colors.bgGreen(envs)}`);
            log.info('\r');

            var config = await logic.generateConfig(app, envs, _path);

            if (validator.isValid(config.message)) {
                reject(config.message);
                return;
            }

            log.info('\r');

            log.info(`${colors.green("Configuration")} Stored for ${colors.green(app + ' App')} on ${colors.green("Env")}: ${colors.bgGreen(envs)}`);
            log.info('\r');
            log.info(`${colors.gray(JSON.stringify(config, null, 4))}`);
            log.info('\r');

            log.info(`${colors.magenta("Generating Config File (JSON) Initialized")}`);
            if (LogLevel.Off === log.level()) {
                resolve(true);
            } else {
                const folder_path = await directory.createDirectories(file_directory);
                if (validator.isValid(folder_path)) {
                    var file_outputName = `${folder_path}\\config.json`;
                    log.info(`${colors.magenta("Created Configuration File Path for Envirnonment")}`);

                    fs.writeFile(file_outputName, JSON.stringify(config), async (err) => {
                        if (err) { reject(err); return; }
                        log.info(`${colors.magenta("Generated Config File (JSON) Completed.")}`);
                        log.info('\r');

                        const search = '/';
                        const replacer = new RegExp(search, 'g');
                        
                        var dir_path = file_outputName.replace(replacer, '\\');                        
                        log.info(`${colors.green("Generated File Located Path")}: ${colors.green(dir_path)}`);
                        const isExist = await logic.getFilePath('/temp');
                        let rmstatus = false;
                        if(validator.isValid(isExist)) {
                            rmstatus = await directory.deleteDirectories('/temp');
                            resolve(true);
                        } else {
                            resolve(true);
                        }

                        // fs.readFile(file_outputName, function (err, data) {
                        //     if (err) throw err;
                        //     log.info(`${colors.magenta("Generated Config File (JSON).")}`);
                        //     if (data) {
                        //         var config_output = require(`./${file_outputName}`);
                        //         log.info(config_output);
                        //     }
                        // });
                    });
                } else {
                    reject('Unable to Create Configuration File Path '); return;
                }
            }
        } catch (error) {
            reject(error);
            return;
        }
    });
}


exports.onInit = onInit;