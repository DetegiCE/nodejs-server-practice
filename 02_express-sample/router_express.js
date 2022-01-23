const express = require('express');
const app = express();
app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    const output = `
        <h2>express</h2>
        <p>This is main page.</p>
        <img src="./sample.png" alt="">
    `
    res.send(output);
});

app.get('/user/:id', (req, res) => {
    res.send(req.params.id + " is user id"); 
});

app.listen(app.get('port'), () => {
    console.log('Connected to port ' + app.get('port'));
});