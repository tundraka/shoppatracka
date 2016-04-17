'use strict';

class Item {
    constructor(item) {
        this.name = item.summary || '';
        this.description = item.description || '';
        this.location = item.location || '';

        if (item.start.date && item.end.date) {
            this.fullDay = true;
            this.start = item.start.date;
            this.end = item.start.end;
        }
         
        if (item.start.dateTime && item.end.dateTime) {
            this.fullDay = false;
            this.start = item.start.dateTime;
            this.end = item.end.dateTime;
        }
    }

    get name() {
        return this.name;
    }

    get description() {
        return this.description;
    }

    get location() {
        return this.location;
    }

    get fullDay() {
        return this.fullDay;
    }

    get start() {
        return this.start;
    }

    get end() {
        return this.end;
    }
}

module.exports = Item;
