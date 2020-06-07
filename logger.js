var colors = require('colors');

var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Off"] = 0] = "Off";
    LogLevel[LogLevel["Error"] = 1] = "Error";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Debug"] = 4] = "Debug";
})(LogLevel || (LogLevel = {}));

let Logger = /** @class */ (() => {
    class Logger {
        constructor(source) {
            this.source = source;
        }
        /**
         * Enables production mode.
         * Sets logging level to LogLevel.Warning.
         */
        enableProductionMode() {
            Logger.level = LogLevel.Debug;
        }

        enableTestMode() {
            Logger.level = LogLevel.Off;
        }
        /**
         * Logs messages or objects  with the debug level.
         * Works the same as console.log().
         */
        debug(...objects) {
            this.log(console.log, LogLevel.Debug, objects, colors.gray);
        }
        /**
         * Logs messages or objects  with the info level.
         * Works the same as console.log().
         */
        info(...objects) {
            this.log(console.info, LogLevel.Info, objects, colors.blue);
        }
        /**
         * Logs messages or objects  with the warning level.
         * Works the same as console.log().
         */
        warn(...objects) {
            this.log(console.warn, LogLevel.Warning, objects, colors.yellow);
        }
        /**
         * Logs messages or objects  with the error level.
         * Works the same as console.log().
         */
        error(...objects) {
            this.log(console.error, LogLevel.Error, objects, colors.red);
        }
        log(func, level, objects, color) {
            if (level <= Logger.level) {
                const log = this.source ? [color('[' + this.source + ']')].concat(objects) : objects;
                func.apply(console, log);
                Logger.outputs.forEach(output => output.apply(output, [this.source, level].concat(objects)));
            }
        }
    }
    /**
     * Current logging level.
     * Set it to LogLevel.Off to disable logs completely.
     */
    Logger.level = LogLevel.Debug;
    /**
     * Additional log outputs.
     */
    Logger.outputs = [];
    return Logger;
})();

exports.Logger =  Logger;
exports.LogLevel = LogLevel;
