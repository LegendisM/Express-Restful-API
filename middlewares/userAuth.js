const express = require('express');
const router = express.Router();

router.use((req,res,next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("Unauthorized Request");
    }
});

module.exports = router;