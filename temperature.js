function getCelciusFromFarenheit(farenheit) {
    return (farenheit - 32) * 5 / 9;
}

function getFarenheitFromCelcius(celsius) {
    return celsius * 9  / 5 + 32
}

module.exports = {
    f2c: getCelciusFromFarenheit,
    c2f: getFarenheitFromCelcius
}
