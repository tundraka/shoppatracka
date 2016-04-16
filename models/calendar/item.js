'use strict';

class Item {
    constructor(item) {
        this.name = item.summary;
        this.description = item.description;
    }
}

module.exports = Item;
