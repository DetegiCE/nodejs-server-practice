const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8081);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let students = [];
let numOfStudent = 0;

app.get('/', (req, res) => {
    res.send('Welcome to SMS');
});

app.get('/student', (req, res) => {
    res.json(students);
});

app.post('/student', (req, res) => {
    const student = {
        id: ++numOfStudent,
        name: req.body.name,
        birth: req.body.birth,
        phone: req.body.phone
    };
    students.push(student);

    res.redirect('/student');
});

app.put('/student/:id', (req, res) => {
    const findStudent = students.find((item) => {
        return item.id == +req.params.id;
    });

    const idx = students.indexOf(findStudent);
    students.splice(idx, 1);

    const student = {
        id: +req.params.id,
        name: req.body.name,
        birth: req.body.birth,
        phone: req.body.phone
    };
    students.push(student);

    res.redirect('/student');
});

app.listen(app.get('port'), () => {
    console.log('Brought to you from port ' + app.get('port') + ' with U');
});