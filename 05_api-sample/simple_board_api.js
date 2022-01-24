const express = require('express');
const morgan = require('morgan');
const uuidApiKey = require('uuid-apikey');
const cors = require('cors');
const url = require('url');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

const key = {
  apiKey: '01BXQG7-HSTMCSE-P6H0GXR-E73PZGT',
  uuid: '0057dbc0-8e75-4665-b1a2-087771c76fc3'
};

let boardList = [];
let numOfBoard = 0;

app.get('/', (req, res) => {
    res.send('This is api.js');
});

app.get('/board', (req, res) => {
    res.send(boardList);
});

app.post('/board', (req, res) => {
    const board = {
        'id': ++numOfBoard,
        'user_id': req.body.user_id,
        'date': new Date(),
        'title': req.body.title,
        'content': req.body.content
    };
    boardList.push(board);

    res.redirect('/board');
});

app.put('/board/:id', (req, res) => {
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id;
    });

    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    const board = {
        'id': +req.params.id,
        'user_id': req.body.user_id,
        'date': new Date(),
        'title': req.body.title,
        'content': req.body.content
    };
    boardList.push(board);

    res.redirect('/board');
});

app.delete('/board/:id', (req, res) => {
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id;
    });

    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    res.redirect('/board');
});

app.get('/board/:apikey/:type', (req, res) => {
    let { type, apikey } = req.params;
    const queryData = url.parse(req.url, true).query;

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credetials', true);

    if (uuidApiKey.isAPIKey(apikey) && uuidApiKey.check(apikey, key.uuid)) {
        if (type === 'search') {
            const keyword = queryData.keyword;
            const result = boardList.filter((e) => {
                return e.title.includes(keyword);
            });
            res.send(result);
        }
        else if (type === 'user') {
            const user_id = queryData.user_id;
            const result = boardList.filter((e) => {
                return e.user_id === user_id;
            });
            res.send(result);
        }
        else {
            res.send('Wrong URL');
        }
    } else {
        res.send('Wrong API Key');
    }
})

app.listen(app.get('port'), () => {
    console.log('Connected to port ' + app.get('port'));
});
