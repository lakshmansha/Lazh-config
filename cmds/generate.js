const ora = require('ora');

const error = require('../utils/error');

const generate = require('../logics/generate');

module.exports = async (args, log) => {
    const spinner = ora().start();

    try {
        const path = args.path || args.p;
        const url = args.url || args.u;
        const app = args.app || args.a;
        const env = args.env || args.e;
        const output = args.output || args.o;

        const isGenerated = await generate(path, app, env, output, log);

        if (typeof isGenerated === 'string') {
            throw (isGenerated);
        } else if (typeof isGenerated === 'boolean') {
            spinner.stop();
        }

    } catch (err) {
        spinner.stop();
        error(err, log);
    }
}