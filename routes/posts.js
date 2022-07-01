const express = require('express');
const router = express.Router();

const userAuth = require('../middlewares/userAuth');
const { isSuperAdmin , isAdmin} = require('../middlewares/groupAuth');

router.post("/create",userAuth,isSuperAdmin,isAdmin,(req,res)=>{res.send("kobs");})

module.exports = router;