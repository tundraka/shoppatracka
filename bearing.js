var bearings = ['N', 'NE', 'NE', 'E', 'E', 'SE', 'SE', 'S', 'S', 'SW', 'SW', 'W',
    'W', 'NW', 'NW' , 'N'];
var angleDivision = 23;

module.exports = function getBearingFromAngle(bearing) {
    if (bearing < 0 || bearing > 360) {
        return 'I don\'t know (${bearing}?)';
    }

    return bearings[Math.floor(bearing / angleDivision)];
};
