const chaiReq = require('chai');

var logger = require('../logger');

const log = new logger.Logger();

describe(' Main Module Test ', () => {
    let Main;

    beforeEach(() => {
        Main = require('../main');
        log.enableTestMode();
    });

    it('should be created', () => {
        chaiReq.assert(Main, 'Unable to Load Main Module');
    });


    describe('onInit Method Test', () => {
        it(`should able to validate if Path is empty`, async () => {
            const params = {
                app: "sample",
                env: 'cdev',
                path: ''
            }
            Main.onInit(params).then((res) => {
                chaiReq.expect(config).to.equal('Pass the Configuration Path to generate Config. eg: --path=path/env-input.json', ` Error While validation of Path is Empty `);
            }, (error) => {
                chaiReq.expect(error).to.equal('Pass the Configuration Path to generate Config. eg: --path=path/env-input.json', ` Error While validation of Path is Empty `);
            });                        
        });

        it(`should able to validate if App Name is empty`, async () => {
            const params = {
                app: "",
                env: 'cdev',
                path: 'test/input.json'
            }
            
            Main.onInit(params).then((res) => {
                chaiReq.expect(res).to.equal('', ` Error While validation of App Name is Empty `);
            }, (error) => {
                chaiReq.expect(error).to.equal('Pass the Parameter App to generate Config. eg: --app=<app>', ` Error While validation of App Name is Empty `);
            });                        
        });

        it(`should able to validate if Env Name is empty`, async () => {
            const params = {
                app: "sample",
                env: '',
                path: 'test/input.json'
            }
            
            Main.onInit(params).then((res) => {
                chaiReq.expect(res).to.equal('', ` Error While validation of Env Name is Empty `);
            }, (error) => {
                chaiReq.expect(error).to.equal('Pass the Parameter Env to generate Config. eg: --env=<env>', ` Error While validation of Env Name is Empty `);
            });                        
        });

        it(`should able to validate on Generate Config File`, async () => {
            const params = {
                app: "sample",
                env: 'cdev',
                path: 'test/input.json'
            }
    
            const _config = {
                Key: "Value",
                AppName: "Sample App",
                Envirnoment: "CDEV",
                message: ''
            }
    
            const res = await Main.onInit(params);
            chaiReq.expect(res).to.equal(true, ` Error While validation of Generation of Config File `);
        });
    });
});