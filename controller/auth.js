const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const User = require('../model/User.js');
const Image = require('../model/Image.js');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const dataUri = require('datauri');
const DataURIParser = require('datauri/parser')
const parseImage = new DataURIParser();
const isAuthenticated = require('../validation/isAuthenticated');

const validateLoginInput = require('../validation/login.js')
const validateSignupInput = require('../validation/signup.js');

const upload = require('../helper/multer')
const uploads = require("../helper/cloudinary")
const getLocation = require('../helper/getLocation')
// Retrieve Session
authRouter.post('/reconnect', (req, res) => {
    req.session.cookie.name = 'random'
    console.log(req.session.currentUser)
    if (req.session) {
        res.send(req.session.currentUser)
    }
})

authRouter.get('/current', (req, res) => {
    res.send(req.session.currentUser);
});

// POST - create user
authRouter.post('/signup', upload.single('userImage'), (req, res) => {

    const {errors, isValid} = validateSignupInput(req.body);
    if (!isValid) {
        return res.status(400).send(errors)
    }
    User.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            errors.email = "There is already a user with this email address";
            res.status(400).send(errors);
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            User.create(req.body)
                .then(user => {
                    const newImage = new Image({
                        type: 'user',
                        user: user._id,
                    })
                    user.image = newImage._id;
                    getLocation(user)
                    const file = req.file
                    let image = parseImage.format(file.mimetype, file.buffer)
                    uploads(image.content, newImage, (err, result) => {
                        console.log('result', result)
                    })
                    // newImage.save();
                    console.log("USER", user);

                })
                .then(user => {
                    req.session.currentUser = user
                    // Send current user to the front end
                    res.send(req.session);
                })
                .catch(err => {
                    if (!isValid) {
                        res.status(400).send(errors);
                    } else {
                        console.log("Signup Error");
                        res.send(err)
                    }
                });
        }
    })
});

authRouter.post('/login', (req, res) => {

    console.log(req.body);
    const {isValid, errors} = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).send(errors);
    }
    User.findOne({email: req.body.email}, (err, user) => {
        getLocation(user)
        if (err) {
            console.log("Login Error");
            return res.status(500).send(err);
        } else if (!user) {
            errors.email = "user not found";
            return res.status(404).send(errors);
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.currentUser = user;
                req.session.cookie.id = user._id
                console.log("req.session", req.session);
                return res.send(req.session)
            } else {
                errors.password = 'email or password invalid';
                errors.email = 'email or password invalid'
                return res.send(errors);

            }
        }
    })
})
authRouter.delete('/logout', (req, res) => {
    isAuthenticated(req, res, () => {
        req.session.destroy(() => {
            console.log(req.session);
            res.clearCookie('connect.sid', {
                path: '/',
                httpOnly: true
            }).send("user is logged logged out")
        })
    })


})
module.exports = authRouter;
