'use strict';

let a = require('./utils/log').getLog('a');
let b = require('./utils/log').getLog('b');
const schedule = require('node-schedule');
const constants = require('./utils/constants');
const hook = require('./hooks/base');
const santoWebhookUrl = require('./urls/santo');

//console.log(constants.get('botkit.debug'));
//console.log(constants.get('botkit.debug') === true);
//console.log(typeof constants.get('botkit.debug'));
//schedule.scheduleJob('6 * * * *', () => {
    //a.info('do');
    //b.info('do');
//});
//console.log(constants.get('slack.defaultchannel'));
//console.log(constants.get('slack.webhooks.hooks.santo'));
//console.log(santoWebhookUrl);
//hook.sendHook();
//


