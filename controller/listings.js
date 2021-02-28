const express = require('express');
const mongoose = require('mongoose');
const listingRouter = express.Router();
const Listing = require('../model/User.js');


listingRouter.post('/post', (req, res,next)=>{
    console.log(req);
    res.send("Current user is logged in and can use this function");
})

module.exports = listingRouter;