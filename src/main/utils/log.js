'use strict';

const winston = require('winston');
const constants = require('./constants');
const logHome = constants.get('globals.loghome')

winston.add(winston.transports.File, {filename: `${logHome}/stdout.log`});
winston.remove(winston.transports.Console);

function getLog(loggerName) {
    return (() => {
        let log = winston.loggers.get(loggerName);

        return {
            info: log.info,
            warn: log.warn,
            error: log.error
        }
    })();
}

module.exports = {
    getLog
};
