const express = require('express');
const controller = require('./controller.js');
const bodyParser = require("body-parser");


const app = express();
const PORT = 3000;

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('hello'));

app.get('/users', controller.findAll);
app.post('/users', controller.create);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));