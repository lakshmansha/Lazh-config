const chaiReq = require('chai');

var logger = require('@lazh/logger');

describe(' Generate Module Test ', () => {
    let generate = require('../logics/generate');
    let log, LogLevel;

    beforeEach(() => {
        log = new logger.Logger();
        LogLevel  = logger.LogLevel;
        log.enableProductionMode(LogLevel.Off);
    });

    it('should be created', () => {
        chaiReq.assert(generate, 'Unable to Load Generate Module');
    });

    describe('on Generate Method Test', () => {

        it(`should able to validate if Path is empty`, async () => {
            const params = {
                app: "sample",
                env: 'cdev',
                path: '',
                output: ''
            }

            const isGenerated = await generate(params.path, params.app, params.env, params.output, log, true);

            if (typeof isGenerated === 'string') {
                chaiReq.expect(isGenerated).to.equal('Pass the Configuration Path to generate Config.', ` Error While validation of Path is Empty `);
            }
        });

        it(`should able to validate if App Name is empty`, async () => {         
            const params = {
                app: "",
                env: 'cdev',
                path: 'input.json',
                output: ''
            }

            const isGenerated = await generate(params.path, params.app, params.env, params.output, log, true);

            if (typeof isGenerated === 'string') {
                chaiReq.expect(isGenerated).to.equal('Pass the Parameter App to generate Config.', ` Error While validation of App Name is Empty `);
            }
        });

        it(`should able to validate if Env Name is empty`, async () => {
            const params = {
                app: "sample",
                env: '',
                path: 'input.json',
                output: ''
            }

            const isGenerated = await generate(params.path, params.app, params.env, params.output, log, true);

            if (typeof isGenerated === 'string') {
                chaiReq.expect(isGenerated).to.equal('Pass the Parameter Env to generate Config.', ` Error While validation of Env Name is Empty `);
            }
        });

        it(`should able to validate on Generate Config File`, async () => {
            const params = {
                app: "sample",
                env: 'cdev',
                path: 'input.json',
                output: ''
            }

            const isGenerated = await generate(params.path, params.app, params.env, params.output, log, true);

            chaiReq.expect(isGenerated).to.equal(true, ` Error While validation of Generation of Config File `);
        });
    });
});