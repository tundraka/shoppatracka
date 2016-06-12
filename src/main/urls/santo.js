'use strict';

const constants = require('../utils/constants');

let base = constants.get('slack.webhooks.baseurl');
let santo = constants.get('slack.webhooks.hooks.santo');
const url = [base, santo].join('/');

module.exports = url;
