'use strict';

const names = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West',
    'West'];
const bearings = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 0];
const angleDivision = 23;
const topDegree = 360;

module.exports = function getBearingFromAngle(bearing) {
    if (bearing < 0 || bearing > topDegree) {
        return 'I don\'t know (${bearing}?)';
    }

    return names[bearings[Math.floor(bearing / angleDivision)]];
};
