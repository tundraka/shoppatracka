'use strict';

const winston = require('winston');
const constants = require('./constants');
const logHome = constants.get('globals.loghome')

const defaultConf = {
    file: {
        level: 'info',
        label: 'stdout',
        file: {
            filename: `${logHome}/stdout.log`
        }
    }
};

function getLogConf(loggerName) {
    return winston.loggers.get(loggerName);
}

function getLog(loggerName) {
    return (() => {
        let log = getLogConf(loggerName)

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
