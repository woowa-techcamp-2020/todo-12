const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3000;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DB,
    password: process.env.DB_PW
})

connection.connect(err => {
    if(err) console.error(err);

    console.log('Successfully connected to the database.');
})

app.get('/', (req, res) => res.send('hihi'));

app.listen(port, () => console.log(`app listening at ${port}`));
