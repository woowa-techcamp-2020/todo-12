const express = require('express');
const controller = require('./controller.js');


const app = express();
const PORT = 4000;

app.get('/', (req, res) => res.send('hello'));

app.get('/users', controller.findAll);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))