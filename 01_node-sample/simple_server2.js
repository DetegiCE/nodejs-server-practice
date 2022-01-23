const http = require('http');

http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello');
        res.end();
    }
}).listen(8080, () => {
    console.log('Connected to port 8080')
});