const _path = require('path');
const chaiReq = require('chai');

var logger = require('@lazh/logger');

const validator = require('../utils/validator');
const directory = require('../utils/directory');

describe(' Config Module Test ', () => {
    let Config;
    let log, LogLevel;

    beforeEach(() => {
        Config = require('../logics/config');
        log = new logger.Logger();
        LogLevel  = logger.LogLevel;
        log.enableProductionMode(LogLevel.Off);
    });

    it('should be created', () => {
        chaiReq.assert(Config, 'Unable to Load Config Module');
    });

    describe('App Validate Method Test', () => {
        it(`should able to validate if App Name is ''`, async () => {
            const app = '';
            const path = 'input.json';

            const _path = await directory.IsFilePathExist(path);
            const isExist = Config.IsAppExist(app, _path);
            chaiReq.expect(isExist).to.equal(false, ` Error While validation of App Name is '' `);
        });

        it(`should able to validate if App Name is 'test'`, async () => {
            const app = 'test';
            const path = 'input.json';

            const _path = await directory.IsFilePathExist(path);
            const isExist = Config.IsAppExist(app, _path);
            chaiReq.expect(isExist).to.equal(false, ` Error While validation of App Name is InValid `);
        });

        it(`should able to validate if App Name is 'sample'`, async () => {
            const app = 'sample';
            const path = 'input.json';

            const _path = await directory.IsFilePathExist(path);
            const isExist = Config.IsAppExist(app, _path);
            chaiReq.expect(isExist).to.equal(true, ` Error While validation of App Name is Valid `);
        });
    });

    describe('Env Validate Method Test', () => {
        it(`should able to validate if Env Name is ''`, async () => {
            const app = 'sample';
            const env = '';
            const path = 'input.json';

            const _path = await directory.IsFilePathExist(path);
            const isExist = Config.IsEnvExist(app, env, _path);
            chaiReq.expect(isExist).to.equal(false, ` Error While validation of Env Name is '' `);
        });

        it(`should able to validate if Env Name is 'test'`, async () => {
            const app = 'sample';
            const env = 'test';
            const path = 'input.json';

            const _path = await directory.IsFilePathExist(path);
            const isExist = Config.IsEnvExist(app, env, _path);
            chaiReq.expect(isExist).to.equal(false, ` Error While validation of Env Name is InValid `);
        });

        it(`should able to validate if Env Name is 'cdev'`, async () => {
            const app = 'sample';
            const env = 'cdev';
            const path = 'input.json';

            const _path = await directory.IsFilePathExist(path);
            const isExist = Config.IsEnvExist(app, env, _path);
            chaiReq.expect(isExist).to.equal(true, ` Error While validation of Env Name is Valid `);
        });
    });

    describe('generateConfig Method Test', () => {

        it(`should able to  validate if Environment is '' `, async () => {
            const app = 'sample';
            const env = '';
            const path = 'input.json';

            const _path = await directory.IsFilePathExist(path);
            const config = await Config.generateConfig(app, env, _path);
            chaiReq.expect(config.message).to.equal('Please provide the Valid Env Name', ` Error While validation of App Name is InValid `);
        });

        it(`should able to validate if App Name is Invalid `, async () => {
            const app = 'test';
            const env = 'cdev';
            const path = 'input.json';

            const _path = await directory.IsFilePathExist(path);
            const config = await Config.generateConfig(app, env, _path);
            chaiReq.expect(config.message).to.equal('Please provide the Valid App Name', ` Error While validation of App Name is InValid `);
        });

        it(`should able to validate if Environment is Invalid `, async () => {
            const app = 'sample';
            const env = 'qa';
            const path = 'input.json';

            const _path = await directory.IsFilePathExist(path);
            const config = await Config.generateConfig(app, env, _path);
            chaiReq.expect(config.message).to.equal('Please provide the Valid Env Name', ` Error While validation of App Name is InValid `);
        });

        it(`should able to validate if Config is Valid `, async () => {
            const _config = {
                Key: "Value",
                AppName: "Sample App",
                Envirnoment: "CDEV",
                message: ''
            }
            const app = 'sample';
            const env = 'cdev';
            const path = 'input.json';

            const _path = await directory.IsFilePathExist(path);
            const config = await Config.generateConfig(app, env, _path);
            chaiReq.expect(validator.isObjValid(config), ` Error On Provided Config File `);
            chaiReq.expect(config.AppName).to.equal(_config.AppName, ` Error While validation of Config Is Valid On App Name `);
            chaiReq.expect(config.Envirnoment).to.equal(_config.Envirnoment, ` Error While validation of Config Is Valid On Envirnoment `);
            chaiReq.expect(config.message).to.equal(_config.message, ` Error While validation of Config Is Valid On Message `);
        });
    });
});
