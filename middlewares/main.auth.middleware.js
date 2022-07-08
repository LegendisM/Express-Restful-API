const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.get("token") == process.env.TOKEN_SECRET) {
        next();
    } else {
        res.status(401).send("Unauthorized Request");
    }
});

module.exports = router;