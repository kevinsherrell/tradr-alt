const express = require('express');
const mongoose = require('mongoose');
const listingRouter = express.Router();
const Listing = require('../model/Listing.js');
const User = require('../model/User.js');
const Image = require('../model/Image.js');
const multer = require('multer');
const path = require('path');
const {v4: uuidv4} = require('uuid');

// Storage
const storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage: storage});

listingRouter.get('/', (req, res) => {
    Listing.find()
        .populate('images')
        .then(listings => {
            console.log(listings)
            res.send(listings);
            // res.render('listing', {data: listings})
        })
});

listingRouter.post('/post', upload.array('listingImage', 5), (req, res, next) => {
    req.body.user = req.session.currentUser._id;
    req.body.location = req.session.currentUser.zipCode;
    Listing.create(req.body)
        .then(listing => {

            console.log(req.files);
            req.files.forEach((file) => {
                const newImage = new Image({
                    type: 'listing',
                    listing: listing._id,
                    url: file.filename
                });
                listing.images.push(newImage._id)
                listing.save();
                newImage.save()
                    .then(image => {
                        console.log('success');
                    }).catch(err => res.send(err));
            })

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
            });
            res.send(listing);
        }).catch(err => {
        console.log("listing error");
        res.send(err.message);
    });
})
listingRouter.put('/update/:id', (req, res) => {
    Listing.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, updatedListing) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).send(updatedListing);
    })
})
listingRouter.delete('/:id',(req,res)=>{
    Listing.findOneAndDelete({_id: req.params.id}, (err, result)=>{
        if(err){
            res.status(500).send(err);
        }
        res.status(200).send("success");
    })
})
module.exports = listingRouter;