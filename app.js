require("dotenv").config({ path: './config/config.env' });

const express = require('express');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

//* Initialation App
const app = express();

//* Config App
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))
app.use(express.urlencoded({ extended: false }));

const initialation = async () => {

    //* Sync Models
    const SyncModels = await require('./database/syncModels').initialation();

    //* Load Routes
    const routes = await require('./routes/init')(app);

    //* Start App
    app.listen(process.env.PORT, () => {
        console.log(`App Started In ${process.env.NODE_ENV} Mode On Port ${process.env.PORT}`);
    });

}

initialation();