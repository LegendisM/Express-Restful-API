const express = require('express');

exports.isAdmin = (req,res,next) => {
    if (req.session.user.group == "admin" || req.session.user.group == "superadmin") {
        next();
    } else {
        res.status(401).send("Unauthorized Request Permission");
    }
};

exports.isSuperAdmin = (req,res,next) => {
    if (req.session.user.group == "superadmin") {
        next();
    } else {
        res.status(401).send("Unauthorized Request Permission");
    }
};

//! this file has problem for check group