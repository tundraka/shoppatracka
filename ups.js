var upsApi = require('shipping-ups')({
    environment: 'live',
    access_key: process.env.upsAccessKey,
    username: process.env.upsUserName,
    password: process.env.upsPassword,
    user_agent: 'shoppatracka 0.1'
});

upsApi.track('', (err, result) => {
    if (err) {
        console.log('error ' + err);
        console.log(JSON.stringify(err));
        return;
    }

    return {
        // TODO.
    };
});

module.exports = upsApi;
