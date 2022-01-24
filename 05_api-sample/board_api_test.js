const morgan = require('morgan');
const express = require('express');
const axios = require('axios');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/board_api_test.html");
});

app.listen(app.get('port'), () => {
    console.log('Connected to port ' + app.get('port'));
});