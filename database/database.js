const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {})
    .then(() => console.log("Connected To Database"))
    .catch((err) => console.log(err));