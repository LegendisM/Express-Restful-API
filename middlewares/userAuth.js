const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

router.use(async (req, res, next) => {

    try {

        let userAuth = req.get("authorization");
        let decodedAuth = jwt.verify(userAuth, process.env.JWT_SECRET);
        let user = await UserModel.findOne({ attributes: ["username", "email", "group"], where: { id: decodedAuth.userid } });
        if (!user) return res.status(400).json({ state: false, messages: ["Unauthorized User"] });
        req.session.user = { username: user.username, email: user.email, group: user.group };
        next();

    } catch (error) {
        res.status(401).json({ state: false, messages: ["Unauthorized Request"] });
    }
});

module.exports = router;