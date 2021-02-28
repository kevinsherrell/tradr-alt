const express = require('express');
const mongoose = require('mongoose');
const authRouter = express.Router();
const User = require('../model/User.js');

// POST - create user
authRouter.post('/', (req, res) => {
    console.log('post route working');
    console.log(req.body);
    const newUser = new User(req.body);

    newUser.save()
        .then(user => {
            res.send(user);
        })
        .catch(err => res.send(err));

    // User.find({email: req.body.email}, (err, user) => {
    //     if (!user) {
    //         const newUser = new User(req.body);
    //         newUser.save((err, newUser) => {
    //             if (err) {
    //                 res.status(500).send(err);
    //             }
    //             res.status(200).send(newUser);
    //         })
    //     }
    //     ;
    // })
})
// POST - log current user in
// GET - get current user
module.exports = authRouter;