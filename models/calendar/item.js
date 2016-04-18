'use strict';

const moment = require('moment');
const constants = require('../../utils/constants');

class Item {
    constructor(item) {
        this.name = item.summary || '';
        this.description = item.description || '';
        this.location = item.location || '';

        if (item.start.date && item.end.date) {
            this.fullDay = true;
            this.start = moment(item.start.date);
            this.end = moment(item.start.end);
        }

        if (item.start.dateTime && item.end.dateTime) {
            this.fullDay = false;
            this.start = moment(item.start.dateTime);
            this.end = moment(item.end.dateTime);
        }
    }

    /**
     * Will provide the lenght (1 day, 3 hours, etc) of the provided item.
     *
     * @param {Item} item the event item.
     * @return {String} a string with the length of the item.
     */
    periodLenght() {
        return this.end.to(this.start, true);
    }

    /**
     * Will provide a human readable string of the start date.
     *
     * @param {Item} item the event item.
     * @returns {String} a string with the start date.
     */
    startString() {
        return this.fullDay
            ? moment(this.start, moment.ISO_8601).format(constants.dates.fullDay)
            : moment(this.start, moment.ISO_8601).format(constants.dates.defaultFormat);
    }

    /**
     * Will provide a string with the length of the item duration. 1 hour, 2 days,
     * etc.
     *
     * @param {Item} item the event item.
     * @returns {String} a string with the length of the item.
     */
    lengthString() {
        let totalDays = this.fullDay ? this.end.diff(this.start, 'days') : 0;
        let length = this.periodLenght();

        return (totalDays === 1) ? '' : ` (${length})`;
    }
    
    toString() {
        let name = this.name;
        let start = this.startString();
        let length = this.lengthString();

        return `${name} on ${start}${length}`;
    }
}

module.exports = Item;
