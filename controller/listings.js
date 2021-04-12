const express = require('express'),
    mongoose = require('mongoose'),
    listingRouter = express.Router(),
    Listing = require('../model/Listing.js'),
    User = require('../model/User.js'),
    Image = require('../model/Image.js'),
    cloudinary = require('../helper/cloudinary'),
    isAuthenticated = require('../validation/isAuthenticated'),
    fs = require('fs')


const upload = require('../helper/multer');

// get all listings
listingRouter.get('/', (req, res) => {
    Listing.find()
        .populate('images')
        .then(listings => {
            // console.log(listings)
            res.send(listings);
            // res.render('listing', {data: listings})
        })
});
// get all listings by id
listingRouter.get('/all/:user_id', (req, res) => {
    // let user_id = mongoose.Types.ObjectId(req.params.user_id);
    let user_id = req.params.user_id;
    console.log(user_id)
    Listing.find({user: req.params.user_id})
        .populate('images')
        .then(listings => res.send(listings))
        .catch(err => res.send(err))
})

// current users listings
listingRouter.get('/myListings', (req, res) => {
    isAuthenticated(req, res, () => {
        Listing.find({user: req.session.currentUser})
            .then(listings => {
                res.send(listings)
            })
            .catch(err => res.send(err))
    })
})
// post new listing
listingRouter.post('/post', upload.array('listingImage', 5), async (req, res, next) => {
    req.body.user = req.session.currentUser._id;
    req.body.location = req.session.currentUser.zipCode;
    req.body.cityState = req.session.currentUser.cityState;
    isAuthenticated(req, res, () => {
        Listing.create(req.body)
            .then(listing => {
                // listing.cityState = req.session.currentUser.cityState

                console.log(req.files);
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

                req.files.forEach((file) => {
                    const newImage = new Image({
                        type: 'listing',
                        listing: listing._id,
                        url: file.filename
                    });
                    listing.images.push(newImage._id)
                    newImage.save()
                        .then(image => {
                            console.log('success');
                        }).catch(err => res.send(err));

                })
                listing.save()
                    .then(result => {
                        Listing
                            .populate(listing, {path: 'images'})
                            .then(listing => res.send(listing))
                    })
                    .catch(err => res.send(err))

                // res.send(listing);
            })
            .catch(err => {
                console.log("listing error");
                res.send(err.message);
            });
    })

})
// update a listing by id
listingRouter.put('/update/:id', upload.array("listingImage"), (req, res) => {
    const id = req.params.id
    isAuthenticated(req, res, () => {
        Listing.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, listing) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (listing) {

                if (req.files) {

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
                        return res.send(listing)
                    })
                }
                if (req.files.length === 0) {
                    res.send(listing)
                }

            } else {
                return res.send("no listing found")
            }


        })
    })
})
// delete a listing by id
listingRouter.delete('/:id', (req, res) => {
    isAuthenticated(req, res, () => {
        Listing.findOneAndDelete({_id: req.params.id}, (err, listing) => {
            if (err) {
                res.status(500).send(err);
            }
            Image.find({listing: listing._id}, (err, data) => {
                if (err) {
                    res.status(500).send(err);
                }
                if (data.length !== 0) {
                    data.forEach(image => {
                        const path = `./public/images/${image.url}`
                        fs.unlink(path, (err) => {
                            if (err) {
                                console.log(err)
                            }
                        })
                        image.remove()
                            .then(image => console.log('success'))
                            .catch(err => console.log(err))
                    })
                }
            })
            res.status(200).send("success");
        })
    })
})
// get listing by id
listingRouter.get('/:id', (req, res) => {
    // let id = new mongoose.Types.ObjectId(req.params.id)
    Listing.findById(req.params.id, (err, listing) => {
        if (err) {
            res.status(500).send(err)
        }
        res.send(listing);
    }).populate('images')
})
module.exports = listingRouter;