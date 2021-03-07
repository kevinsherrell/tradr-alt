const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const User = require('../model/User.js');
const Image = require('../model/Image.js');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path');

const validateLoginInput = require('../validation/login.js')
const validateSignupInput = require('../validation/signup.js');

// Storage
const storage = multer.diskStorage({
    destination: './public/images',
    filename: function (req, file, cb) {
        cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({storage: storage});

authRouter.get('/current', (req, res) => {
    res.send(req.session.currentUser);
});

// POST - create user
authRouter.post('/signup', upload.single('userImage'),(req, res) => {

    const {errors, isValid} = validateSignupInput(req.body);


    // upload.single('userImage')(req, res, (err) => {
    //     if (err instanceof multer.MulterError) {
    //         res.send([...multer.MulterError])
    //     } else if (err) {
    //         res.send(err);
    //     }
    //     console.log()
    // })

    User.findOne({email: req.body.email}, (err, user) => {


        if (user) {
            errors.email = "There is already a user with this email address";
            res.status(400).send(errors);

        } else {

            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            console.log(User.firstName)
            User.create(req.body)
                .then(user => {
                    const newImage = new Image({
                        type: 'user',
                        user: user._id,
                        url: req.file.filename
                    })
                    const data = [user, newImage];
                    user.img = newImage._id;
                    user.save();
                    newImage.save();
                    console.log(user);
                    // Send current user to the front end
                    res.send(user);
                })
                .catch(err => {
                    if (!isValid) {
                        res.status(400).send(errors);
                    }else{
                        console.log("Signup Error");
                        res.send(err)
                    }
                });
        }
    })
});
// POST - log in user
authRouter.post('/login', (req, res) => {
    console.log(req.body);
    const {isValid, errors} = validateLoginInput(req.body);
    if (!isValid) {
        res.status(400).send(errors);
    }
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            console.log("Login Error");
            res.status(500).send(err);
        } else if (!user) {
            errors.email = "user not found";
            res.status(404).send(errors);
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.currentUser = user;
                console.log(req.session)
                res.send(user)
            } else {
                res.send("username or password invalid");

            }
        }
    })
})
authRouter.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log(req.session);
        res.send("user is logged logged out")
    })

})
module.exports = authRouter;