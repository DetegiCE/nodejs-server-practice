const redis = require('redis');

(async() => {
    const client = redis.createClient();
    await client.connect();
    const val = await client.get('myKey');
    console.log(val);
})();

