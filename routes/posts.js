const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/userAuth');

router.post("/create", userAuth, (req, res) => { res.send("kobs"); })

module.exports = router;