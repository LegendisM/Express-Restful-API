const express = require('express');
const router = express.Router();

router.use((req,res,next) => {
    if (req.headers.authorization == process.env.AUTHORIZATION_SECRET) {
        next();
    } else {
        res.status(401).send("Unauthorized Request");
    }
});

module.exports = router;