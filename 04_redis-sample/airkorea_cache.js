const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const morgan = require('morgan');
const axios = require('axios');

const express = require('express');
const app = express();

const redis = require('redis');
const client = redis.createClient();
client.on('error', (err) => {
    console.log('Redis Error: ', err);
});

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true; }))