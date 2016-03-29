'use strict';

const shopatracka = require('./facades/botkit');
const commands = require('./commands/manager');

commands.init(shoppatracka);
