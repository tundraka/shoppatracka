'use strict';

const nconf = require('nconf');

nconf.file({file: process.env.file_conf});
console.log(nconf.get('a'));
console.log(nconf.get('b:c'));
