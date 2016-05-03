'use strict';

const shoppatracka = require('./facades/botkit').start();
const commands = require('./commands/manager');
const tasks = require('./tasks/manager');

commands.init(shoppatracka);
tasks.init(shoppatracka);
