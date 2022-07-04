require("dotenv").config({ path: './config/config.env' });

const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

//* Initialation App
const app = express();
const db = require('./database/database');

//* Config App
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))
app.use(express.urlencoded({ extended: false }));

//* Load Routes
const routes = require('./routes/init')(app);

//* Start App
app.listen(process.env.PORT, () => {
    console.log(`App Started In ${process.env.NODE_ENV} Mode On Port ${process.env.PORT}`);
});