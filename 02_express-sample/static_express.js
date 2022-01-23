const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index2.html');
});

app.listen(app.get('port'), () => {
    console.log('Connected to port ' + app.get('port'));
});