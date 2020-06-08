var fs = require('fs');
var colors = require('colors');

var logger = require('./helper/logger');
const log = new logger.Logger();
const LogLevel = logger.LogLevel;

var common = require('./common');
var logic = require('./logic');

log.enableProductionMode();

async function onInit(params) {
    return new Promise(async (resolve, reject) => {
        try {
            var file_directory = `/dist/${params['app']}/${params['env']}`;
            var file_outputName = `.${file_directory}/config.json`;

            var path = params['path'];
            if (!common.isValid(path)) { reject('Pass the Configuration Path to generate Config. eg: --path=path/env-input.json'); return; }
            const _path = await logic.getFilePath(path);
            if (!common.isValid(_path)) {
                reject('Please provide the Valid Configuration Path');
                return;
            }

            log.info(`${colors.green("Config Path")}: ${colors.bgGreen(path)}`);
            log.info('\r');

            var app = params['app'];
            if (!common.isValid(app)) { reject('Pass the Parameter App to generate Config. eg: --app=<app>'); return; }
            const _app = logic.IsAppExist(app, _path);
            if (!_app) {
                reject('Please provide the Valid App Name');
                return;
            }

            log.info(`${colors.green("App Name")} : ${colors.bgGreen(app)}`);

            var envs = params['env'];
            if (!common.isValid(envs)) { reject('Pass the Parameter Env to generate Config. eg: --env=<env>'); return; }
            const _env = logic.IsEnvExist(app, envs, _path);
            if (!_env) {
                reject('Please provide the Valid Envirnoment Name');
                return;
            }

            log.info(`${colors.green("Env Name")}: ${colors.bgGreen(envs)}`);
            log.info('\r');

            var config = await logic.generateConfig(app, envs, _path);

            if (common.isValid(config.message)) {
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
                common.createDirectories(file_directory, (status) => {
                    if (status) {
                        log.info(`${colors.magenta("Created Configuration File Path for Envirnonment")}`);

                        fs.writeFile(file_outputName, JSON.stringify(config), (err) => {
                            if (err) { reject(err); return; }
                            log.info(`${colors.magenta("Generated Config File (JSON) Completed.")}`);
                            log.info('\r');

                            const search = '/';
                            const replacer = new RegExp(search, 'g')

                            var temp_file_path = file_outputName.substring(1);
                            var dir_path = temp_file_path.replace(replacer, '\\');
                            var file_path = __dirname + dir_path;
                            log.info(`${colors.green("Generated File Located Path")}: ${colors.green(file_path)}`);
                            resolve(true);
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
                });
            }
        } catch (error) {
            reject(error);
            return;
        }
    });
}


exports.onInit = onInit;