const express = require('express');
const router = express.Router();

const mainAuth = require('../middlewares/main.auth.middleware');

const usersRoute = require('./user.route');
const postsRoute = require('./post.route');

router.use("/user", usersRoute);
router.use("/post", postsRoute);

module.exports = (app) => app.use("/api", mainAuth, router);

