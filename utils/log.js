'use strict';

const winston = require('winston');
const constants = require('./constants');
const logHome = constants.get('globals.loghome')

//winston.add(winston.transports.File, {filename: './o.log'});
winston.add(winston.transports.File, {filename: `${logHome}/stdout.log`});
winston.remove(winston.transports.Console);

const defaultConf = {
    file: {
        level: 'info',
        label: 'stdout',
        file: {
            filename: `${logHome}/stdout.log`
        }
    }
};

//function getLogConf(loggerName) {
    //winston.loggers.add(loggerName, defaultConf);
    //return winston.loggers.get(loggerName);
//}

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
