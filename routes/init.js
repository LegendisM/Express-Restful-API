const express = require('express');
const router = express.Router();

const mainAuth = require('../middlewares/mainAuth');

const usersRoute = require('./users');
const postsRoute = require('./posts');

router.use("/user",usersRoute);
router.use("/post",postsRoute);

module.exports = (app) => app.use("/api",mainAuth,router);

