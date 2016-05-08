'use strict';

const botkit = require('./facades/botkit');
const commands = require('./commands/manager');
const tasks = require('./tasks/manager');
const log = require('../utils/log').getLog('main');

botkit.start().then((shoppatracka) => {
    log.info('bot started');
    commands.init(shoppatracka);
    tasks.init(shoppatracka);
}).catch((err) => {
    log.error('Unable to start botkit', JSON.stringify(err));
});
