const chaiReq = require('chai');
const assert = require('assert');
const common = require('../common');
const _path = require('path');

describe(' Main Module Test ', () => {
    let Main;

    beforeEach(() => {
        Main = require('../main');
    });

    it('should be created', () => {
        chaiReq.assert(Main, 'Unable to Load Main Module');
    });

    // it(`should able to validate if Params is Valid `, async () => {
    //     const params = {
    //         app: "sample",
    //         env: 'cdev',
    //         path: 'test/input.json'
    //     }

    //     const _config = {
    //         Key: "Value",
    //         AppName: "Sample App",
    //         Envirnoment: "CDEV",
    //         message: ''
    //     }

    //     const res = await Main.onInit(params);      
    //     console.log(res)  
    //     chaiReq.expect(common.isObjValid(res), ` Error On Provided Config File `);
    //     chaiReq.expect(res.AppName).to.equal(_config.AppName, ` Error While validation of Config Is Valid On App Name `);
    //     chaiReq.expect(res.Envirnoment).to.equal(_config.Envirnoment, ` Error While validation of Config Is Valid On Envirnoment `);
    //     chaiReq.expect(res.message).to.equal(_config.message, ` Error While validation of Config Is Valid On Message `);
    //     chaiReq.expect(res.Key).to.equal(_config.Key, ` Error While validation of Config Is Valid On Key `);
    // });

    
    // it(`should able to validate if App Name is ''`, async () => {
    //     const params = {
    //         app: "",
    //         env: 'cdev',
    //         path: 'test/input.json'
    //     }

    //     const config = await Main.onInit(params);
    //     chaiReq.expect(config.message).to.equal('Please provide the Valid App Name', ` Error While validation of App Name is Empty `);
    // });

    // it(`should able to  validate if Environment is '' `, async () => {
    //     const app = 'sample';
    //     const env = '';
    //     const path = 'test/input.json';

    //     const config = await Logic.getConfig(app, env, path);        
    //     chaiReq.expect(config.message).to.equal( 'Please provide the Valid Env Name',` Error While validation of App Name is InValid `);
    // });

    // it(`should able to validate if path is Invalid Path `, async () => {
    //     const res = await Logic.getFilePath('tests/env-config.json');  
    //     chaiReq.expect(res).to.equal('', ` Error While validation of Invalid Path `);      
    // });

    // it(`should able to validate if path is Valid`, async () => {
    //     const path = _path.resolve(__dirname, './input.json');
    //     const res = await Logic.getFilePath('test/input.json');
    //     chaiReq.expect(res).to.equal(path, `Error While retrive Config Path for Valid Path `);     
    // });


    // it(`should able to validate if App Name is Invalid `, async () => {
    //     const app = 'test';
    //     const env = 'cdev';
    //     const path = 'test/input.json';

    //     const config = await Logic.getConfig(app, env, path);        
    //     chaiReq.expect(config.message).to.equal('Please provide the Valid App Name', ` Error While validation of App Name is InValid `);
    // });

    // it(`should able to validate if Environment is Invalid `, async () => {
    //     const app = 'sample';
    //     const env = 'qa';
    //     const path = 'test/input.json';

    //     const config = await Logic.getConfig(app, env, path);        
    //     chaiReq.expect(config.message).to.equal( 'Please provide the Valid Env Name',` Error While validation of App Name is InValid `);
    // });

    // it(`should able to validate if Config is Valid `, async () => {
    // const _config = {
    //     Key:  "Value",
    //     AppName: "Sample App",
    //     Envirnoment: "CDEV",
    //     message: '' 
    // }
    //     const app = 'sample';
    //     const env = 'cdev';
    //     const path = 'test/input.json';

    //     const config = await Logic.getConfig(app, env, path);
    //     chaiReq.expect(common.isObjValid(config), ` Error On Provided Config File `); 
    //     chaiReq.expect(config.AppName).to.equal(_config.AppName, ` Error While validation of Config Is Valid On App Name `);
    //     chaiReq.expect(config.Envirnoment).to.equal(_config.Envirnoment, ` Error While validation of Config Is Valid On Envirnoment `);
    //     chaiReq.expect(config.message).to.equal(_config.message, ` Error While validation of Config Is Valid On Message `);
    // });

});