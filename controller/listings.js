const express = require('express');
const mongoose = require('mongoose');
const listingRouter = express.Router();
const Listing = require('../model/Listing.js');
const User = require('../model/User.js');


listingRouter.post('/post', (req, res, next) => {
    req.body.user = req.session.currentUser._id;
    req.body.location = req.session.currentUser.zipCode;
    Listing.create(req.body)
        .then(listing => {
            User.findOne({_id: req.body.user}, (err, user) => {
                if (err) {
                    res.status(500).send(err)
                }
                user.listings.push(listing._id);
                user.save()
                    .then(() => console.log("user has been updated with listing"))
                    .catch(err => {
                        res.send(err);
                    })

            })
            res.send(listing);
        }).catch(err => {
        console.log("listing error");
        res.send(err.message);
    });
})

module.exports = listingRouter;