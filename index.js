const express = require('express');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const app = express();
const db = require("./db/connection")

const authRoutes = require('./routes/auth');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Forbidden');

        req.user = user;

        next();
    });
} 

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');

    try{
        db.authenticate();
        console.log("Connected to MariaDB instance: " + process.env.DB_NAME);
    }
    catch{
        console.log("Unable to connect to MariaDB instance: " + process.env.DB_NAME);
    }
});
  