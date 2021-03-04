const express = require('express');
const mongoose = require('mongoose');
const userRouter = express.Router();
const User = require('../model/User.js');
const Listing = require('../model/Listing.js');
const Image = require('../model/Image.js');
// GET - get all users
userRouter.get('/all', (req, res) => {
    console.log('user route working');
    User.find()
        .populate('listings')
        .exec((err, users) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(users);
        })
});
// GET - seed user data

userRouter.get('/seed', (req, res) => {
    console.log("Seed is working");
    // const newUsers = [
    //
    // ]
    User.insertMany([{
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
        .then(users => {
            res.send(users)
        }).catch(err => {
        console.log('user error');
        res.send(err);
    })

});
// GET - get user by id
userRouter.get('/:id', async (req, res) => {
    try {
        // Delete current user
        const deleteUser = await User.findOneAndDelete({_id: req.params.id});
        // Delete listings belonging to the user
        // const deleteListings = await Listing.deleteMany({user: req.params.id});
        return res.status(200).send('user and listings have been deleted');
    } catch (err) {
        res.status(500);
        res.send(err);
    }
})

userRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await User.findOneAndDelete({_id: id});
        await Listing.find({user: id}, (err, listings) => {
            listings.forEach((listing) => {
                console.log(listing);
                Image.deleteMany({listing: listing._id}, (err, result) => {
                    console.log(result)
                })
            })
        })
        await Listing.deleteMany({user: id}, (err, listings) => {
            console.log(listings);
        });
        res.send('success');
    } catch (err) {
        res.send(err);
    }

})
module.exports = userRouter;