const express = require('express');
const bodyParser = require('body-parser');
require('./connection.js');
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('hihi'));

app.listen(PORT, () => console.log(`app listening at ${PORT}`));
