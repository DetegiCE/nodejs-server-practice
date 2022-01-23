const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
require('dotenv').config();
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/airkorea', async (req, res) => {
    const serviceKey = process.env.AIRKOREA_APIKEY;
    const airUrl = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?';

    let params = encodeURI('serviceKey') + '=' + serviceKey;
    params += '&' + encodeURI('numOfRows') + '=' + encodeURI('100');
    params += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
    params += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
    params += '&' + encodeURI('returnType') + '=' + encodeURI('json');
    params += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
    params += '&' + encodeURI('ver') + '=' + encodeURI('1.3');

    const url = airUrl + params;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    }
    catch(error) {
        console.log(error);
    }
});

app.get('/airkorea/detail', async (req, res) => {
    const serviceKey = process.env.AIRKOREA_APIKEY;
    const airUrl = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?';

    let params = encodeURI('serviceKey') + '=' + serviceKey;
    params += '&' + encodeURI('numOfRows') + '=' + encodeURI('100');
    params += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
    params += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
    params += '&' + encodeURI('returnType') + '=' + encodeURI('json');
    params += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
    params += '&' + encodeURI('ver') + '=' + encodeURI('1.3');

    const url = airUrl + params;

    try {
        const result = await axios.get(url);
        const airItem = {
            "location": '마포구',
            "time": result.data.response.body.items[0]['dataTime'],
            "pm10": result.data.response.body.items[0]['pm10Value'],
            "pm25": result.data.response.body.items[0]['pm25Value']
        }

        const badAir = [];
        if(airItem.pm10 <= 30) badAir.push('GOOD');
        else if(airItem.pm10 <= 80) badAir.push('NORMAL');
        else if(airItem.pm10 <= 150) badAir.push('BAD');
        else if(airItem.pm10 <= 250) badAir.push('VERY BAD');
        else badAir.push('HAZARDOUS');

        if(airItem.pm25 <= 15) badAir.push('GOOD');
        else if(airItem.pm25 <= 35) badAir.push('NORMAL');
        else if(airItem.pm25 <= 75) badAir.push('BAD');
        else if(airItem.pm25 <= 115) badAir.push('VERY BAD');
        else badAir.push('HAZARDOUS');

        res.send(200, `관측 지역: ${airItem.location} / 관측 시간: ${airItem.time}<br>PM10: ${airItem.pm10} / PM25: ${airItem.pm25}<br>상태: ${badAir.join(', ')}`);
    }
    catch(err) {
        console.log(err);
    }
});

app.listen(app.get('port'), () => {
    console.log('Connected to port ' + app.get('port'));
});