'use strict';

const shoppatracka = require('./facades/botkit').start();
const commands = require('./commands/manager');

commands.init(shoppatracka);
