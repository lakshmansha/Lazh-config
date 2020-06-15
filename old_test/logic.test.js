const _path = require('path');
const chaiReq = require('chai');

const common = require('../common');
const validator = require('../utils/validator');

describe(' Logic Module Test ', () => {
    let Logic;

    beforeEach(() => {
        Logic = require('../logic');
    });

    it('should be created', () => {
        chaiReq.assert(Logic, 'Unable to Load Login Module');
    });

    describe('getFilePath Method Test', () => {
        it(`should able to validate if path is '' `, async () => {
            const path = '';
            const res = await Logic.getFilePath(path);
            chaiReq.expect(res).to.equal('', `Error While Sending Path as ''`);
        });

        it(`should able to validate if path is Invalid Path `, async () => {
            const path = 'test/ets.json';
            const res = await Logic.getFilePath(path);
            chaiReq.expect(res).to.equal('', ` Error While validation of Invalid Path `);
        });

        it(`should able to validate if path is Valid`, async () => {
            const _testpath = _path.resolve(__dirname, './input.json');
            const path = 'test/input.json';
            const res = await Logic.getFilePath(path);
            chaiReq.expect(res).to.equal(_testpath, `Error While retrive Config Path for Valid Path `);
        });
    });

    describe('App Validate Method Test', () => {
        it(`should able to validate if App Name is ''`, async () => {
            const app = '';
            const path = 'test/input.json';

            const _path = await Logic.getFilePath(path);
            const isExist = Logic.IsAppExist(app, _path);
            chaiReq.expect(isExist).to.equal(false, ` Error While validation of App Name is '' `);
        });

        it(`should able to validate if App Name is 'test'`, async () => {
            const app = 'test';
            const path = 'test/input.json';

            const _path = await Logic.getFilePath(path);
            const isExist = Logic.IsAppExist(app, _path);
            chaiReq.expect(isExist).to.equal(false, ` Error While validation of App Name is InValid `);
        });

        it(`should able to validate if App Name is 'sample'`, async () => {
            const app = 'sample';
            const path = 'test/input.json';

            const _path = await Logic.getFilePath(path);
            const isExist = Logic.IsAppExist(app, _path);
            chaiReq.expect(isExist).to.equal(true, ` Error While validation of App Name is Valid `);
        });
    });

    describe('Env Validate Method Test', () => {
        it(`should able to validate if Env Name is ''`, async () => {
            const app = 'sample';
            const env = '';
            const path = 'test/input.json';

            const _path = await Logic.getFilePath(path);
            const isExist = Logic.IsEnvExist(app, env, _path);
            chaiReq.expect(isExist).to.equal(false, ` Error While validation of Env Name is '' `);
        });

        it(`should able to validate if Env Name is 'test'`, async () => {
            const app = 'sample';
            const env = 'test';
            const path = 'test/input.json';

            const _path = await Logic.getFilePath(path);
            const isExist = Logic.IsEnvExist(app, env, _path);
            chaiReq.expect(isExist).to.equal(false, ` Error While validation of Env Name is InValid `);
        });

        it(`should able to validate if Env Name is 'cdev'`, async () => {
            const app = 'sample';
            const env = 'cdev';
            const path = 'test/input.json';

            const _path = await Logic.getFilePath(path);
            const isExist = Logic.IsEnvExist(app, env, _path);
            chaiReq.expect(isExist).to.equal(true, ` Error While validation of Env Name is Valid `);
        });
    });

    describe('generateConfig Method Test', () => {
        it(`should able to validate if Config is Valid `, async () => {
            const _config = {
                Key: "Value",
                AppName: "Sample App",
                Envirnoment: "CDEV",
                message: ''
            }
            const app = 'sample';
            const env = 'cdev';
            const path = 'test/input.json';

            const config = await Logic.getConfig(app, env, path);
            chaiReq.expect(validator.isObjValid(config), ` Error On Provided Config File `);
            chaiReq.expect(config.AppName).to.equal(_config.AppName, ` Error While validation of Config Is Valid On App Name `);
            chaiReq.expect(config.Envirnoment).to.equal(_config.Envirnoment, ` Error While validation of Config Is Valid On Envirnoment `);
            chaiReq.expect(config.message).to.equal(_config.message, ` Error While validation of Config Is Valid On Message `);
        });
    });

    describe('getConfig Method Test', () => {

        it(`should able to  validate if Environment is '' `, async () => {
            const app = 'sample';
            const env = '';
            const path = 'test/input.json';

            const config = await Logic.getConfig(app, env, path);
            chaiReq.expect(config.message).to.equal('Please provide the Valid Env Name', ` Error While validation of App Name is InValid `);
        });

        it(`should able to validate if App Name is Invalid `, async () => {
            const app = 'test';
            const env = 'cdev';
            const path = 'test/input.json';

            const config = await Logic.getConfig(app, env, path);
            chaiReq.expect(config.message).to.equal('Please provide the Valid App Name', ` Error While validation of App Name is InValid `);
        });

        it(`should able to validate if Environment is Invalid `, async () => {
            const app = 'sample';
            const env = 'qa';
            const path = 'test/input.json';

            const config = await Logic.getConfig(app, env, path);
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
            const path = 'test/input.json';

            const config = await Logic.getConfig(app, env, path);
            chaiReq.expect(validator.isObjValid(config), ` Error On Provided Config File `);
            chaiReq.expect(config.AppName).to.equal(_config.AppName, ` Error While validation of Config Is Valid On App Name `);
            chaiReq.expect(config.Envirnoment).to.equal(_config.Envirnoment, ` Error While validation of Config Is Valid On Envirnoment `);
            chaiReq.expect(config.message).to.equal(_config.message, ` Error While validation of Config Is Valid On Message `);
        });
    });
});
