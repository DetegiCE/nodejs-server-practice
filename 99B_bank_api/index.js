const morgan = require('morgan');
const express = require('express');
const uuidAPIkey = require('uuid-apikey');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 9090);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let bankAccounts = [];
let numOfBankAccounts = 0;

app.get('/', (req, res) => {
    res.send('Welcome to Bank');
});

app.get('/account', (req, res) => {
    res.sendFile(__dirname + "/account.html");
});

// Create Account
app.post('/account', (req, res) => {
    const key = uuidAPIkey.create();
    console.log(key['apiKey']);
    console.log(key['uuid']);
    
    const newAccount = {
        id: ++numOfBankAccounts,
        name: req.body.name,
        balance: Number(req.body.balance),
        bookNumber: require('./bankbook')(key['uuid']),
        apiKey: key['apiKey'],
        uuid: key['uuid']
    };
    bankAccounts.push(newAccount);

    res.json(newAccount);
});

// View Account
app.get('/account/:id', (req, res) => {
    const findAccount = bankAccounts.find((item) => {
        return item.id == +req.params.id;
    });

    res.json(findAccount);
});

// View All Accounts
app.get('/accounts', (req, res) => {
    res.json(bankAccounts);
});

app.get('/deposit', (req, res) => {
    res.sendFile(__dirname + '/deposit.html');
})

// Deposit
app.put('/deposit', (req, res) => {
    const findAccount = bankAccounts.find((item) => {
        return item.id == +req.params.id;
    });

    findAccount.balance += req.body.deposit;

    res.json(findAccount);
});

app.listen(app.get('port'), () => {
    console.log('Let you dive from port ' + app.get('port') + ' with U');
});