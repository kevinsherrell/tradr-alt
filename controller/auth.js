const express = require('express');
const mongoose = require('mongoose');
const authRouter = express.Router();
const User = require('../model/User.js');

// POST - create user
authRouter.post('/signup', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            res.status(400).send("user already exists")
        } else {
            const newUser = new User(req.body);
            console.log(User.firstName)
            newUser.save()
                .then(user => {
                    console.log(user);
                    res.send({
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        img: user.img,
                        listings: user.listings,
                        dateCreated: user.dateCreated,
                        dateUpdated: user.dateUpdated
                    });
                })
                .catch(err => res.send(err));
        }

    })
});
// POST - log in user


module.exports = authRouter;