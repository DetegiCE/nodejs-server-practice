const http = require('http');

const session = {};
const sessKey = new Date();
session[sessKey] = {name: 'SUI'};

http.createServer((req, res) => {
    res.writeHead(200, {'Set-cookie': `session=${sessKey}`});
    res.end('Session-cookie --> Header');
}).listen(8080, () => {
    console.log('Connected to port 8080!');
});