const express = require('express');
const mongoose = require('mongoose');
const authRouter = express.Router();
const User = require('../model/User.js');

// POST - create user
authRouter.post('/signup', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            res.status(400).send("user already exists")
        }
        else{
            const newUser = new User(req.body);
            newUser.save()
                .then(user => {
                    res.send(user);
                })
                .catch(err => res.send(err));
        }

    })
});
// POST - log current user in

// GET - get all users

module.exports = authRouter;