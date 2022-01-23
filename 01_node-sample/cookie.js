const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Set-Cookie': 'name=SUI'});
    console.log(req.headers.cookie);
    res.end('Cookie --> Header');
}).listen(8080, () => {
    console.log('Connected to port 8080');
});