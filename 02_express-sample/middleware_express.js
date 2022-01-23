const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser('secret@q1w2e3r4'));
app.use(session({
    secret: 'secret@q1w2e3r4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    },
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    if(req.session.name) {
        const output = `
            <h2>LOGGED IN</h2>
            <p>Hello ${req.session.name}</p>
        `
        res.send(output);
    }
    else {
        const output = `
            <h2>NOT LOGGED IN</h2>
            <p>Please Log in.</p>
        `
        res.send(output);
    }
});

app.get('/login', (req, res) => {
    console.log(req.session);
    req.session.name = 'Sui';
    res.send('Login OK');
});

app.get('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    res.end('Logout OK');
});

app.listen(app.get('port'), () => {
    console.log('Connected to port ' + app.get('port'));
});