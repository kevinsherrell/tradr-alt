const express = require('express');
const mongoose = require('mongoose');
const userRouter = express.Router();
const User = require('../model/User.js');

// GET - get all users
userRouter.get('/', (req, res) => {
    console.log('user route working');
    User.find((err, users)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send(users);
    });
});
// GET - get user by id
// GET - get all users

module.exports = userRouter;