const express = require('express');
const mongoose = require('mongoose');
const userRouter = express.Router();
const User = require('../model/User.js');

// GET - get all users
userRouter.get('/all', (req, res) => {
    console.log('user route working');
    User.find((err, users) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(users);
    });
});
// GET - seed user data

userRouter.get('/seed',  (req, res) => {
    console.log("Seed is working");
    // const newUsers = [
    //
    // ]
    User.insertMany([  {
        firstName: 'Kevin',
        lastName: "Sherrell",
        zipCode: "62223",
        email: "email@email.com",
    }, {
        firstName: 'Jony',
        lastName: "Shantell",
        zipCode: "84058",
        email: "email2@email.com",
    }, {
        firstName: 'Tom',
        lastName: "Ford",
        zipCode: "62268",
        email: "email3@email.com",
    }, {
        firstName: 'Steve',
        lastName: "Mitchel",
        zipCode: "63103",
        email: "email4@email.com",
    }, {
        firstName: 'Virginia',
        lastName: "Thompson",
        zipCode: "22060",
        email: "email5@email.com",
    }, {
        firstName: 'Kathy',
        lastName: "Wexler",
        zipCode: "75006",
        email: "email6@email.com",
    }, {
        firstName: 'Janus',
        lastName: "Masters",
        zipCode: "75011",
        email: "email7@email.com",
    }, {
        firstName: 'Kenneth',
        lastName: "Michaels",
        zipCode: "75015",
        email: "email8@email.com",
    }, {
        firstName: 'Zenny',
        lastName: "Adibe",
        zipCode: "10001",
        email: "email9@email.com",
    }, {
        firstName: 'Terrel',
        lastName: "Sampson",
        zipCode: "10003",
        email: "email10@email.com",
    }])
        .then(users=>{
            res.send(users)
        }).catch(err=>{
        res.send(err);
    })

});
// GET - get user by id
userRouter.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(user);
    })
})



module.exports = userRouter;