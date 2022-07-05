const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/userAuth');
const userController = require('../controllers/userController');

// @desc Handle User Register
// @route POST /user/register
// @body username , email , password
router.post("/register", userController.register);

// @desc Handle User Login
// @route POST /user/login
// @body username , password
router.post("/login", userController.login);

module.exports = router;