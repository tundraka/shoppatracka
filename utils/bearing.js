'use strict';

let names = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West',
    'West'];
let bearings = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 0];
let angleDivision = 23;

module.exports = function getBearingFromAngle(bearing) {
    if (bearing < 0 || bearing > 360) {
        return 'I don\'t know (${bearing}?)';
    }

    return names[bearings[Math.floor(bearing / angleDivision)]];
};
