const express = require('express');
const mongoose = require('mongoose');
const userRouter = express.Router();
const User = require('../model/User.js');
const Listing = require('../model/Listing.js');
const Image = require('../model/Image.js');
const isAuthenticated = require('../validation/isAuthenticated');
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
    User.findById({_id: req.params.id})
        .populate('listings')
        .then(user => {
            return res.send(user);
        })
        .catch(err => {
            return res.send(err);
        })
})
// DELETE - delete user by id
userRouter.delete('/:id', (req, res) => {
    isAuthenticated(req, res, async () => {
        const id = req.params.id;
        try {
            await User.findOneAndDelete({_id: id});
            await Listing.find({user: id}, (err, listings) => {
                if (err) {
                    res.status(500).send(err);
                }
                listings.forEach((listing) => {
                    console.log(listing);
                    // Delete all images associated with this listing
                    Image.deleteMany({listing: listing._id}, (err, result) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                        console.log(result)
                    })
                    // Delete avatar image associated with this user
                    Image.deleteOne({user: id}, (err, result) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                        console.log(result);
                    })
                })
            })
            // Delete all listings associated with this user
            await Listing.deleteMany({user: id}, (err, listings) => {
                if (err) {
                    res.status(500).send(err);
                }
                console.log(listings);
            });
            res.send('success');
        } catch (err) {
            res.send(err);
        }
    })

})
// PUT - update user
userRouter.put('/update/:id', (req, res) => {
    isAuthenticated(req, res, () => {
        User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedUser) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(201).send(updatedUser);
        })
    });

})
module.exports = userRouter;