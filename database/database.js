const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/restuful", {})
    .then(() => console.log("Connected To Database"))
    .catch((err) => console.log(err));