const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const User = require('../model/User.js');
const Image = require('../model/Image.js');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path');

const isAuthenticated = require('../validation/isAuthenticated');

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


// Retrieve Session
authRouter.post('/reconnect',(req, res)=>{
    req.session.cookie.name = 'random'
    console.log(req.session.currentUser)
    if(req.session){
        res.send(req.session.currentUser)
    }
    // res.send()
        // User.findById({_id: req.session.cookie.id})
        //     .then(user=>{
        //         req.session.currentUser = user;
        //         res.status(200).send(req.session);
        //     })
})

authRouter.get('/current', (req, res) => {
    res.send(req.session.currentUser);
});

// POST - create user
// authRouter.post('/signup', upload.single('userImage'),(req, res) => {
//     console.log(req.body);
//     const {errors, isValid} = validateSignupInput(req.body);
//     // upload.single('userImage')(req, res, (err) => {
//     //     if (err instanceof multer.MulterError) {
//     //         res.send([...multer.MulterError])
//     //     } else if (err) {
//     //         res.send(err);
//     //     }
//     //     console.log()
//     // })
//
//     User.findOne({email: req.body.email}, (err, user) => {
//         if (user) {
//             errors.email = "There is already a user with this email address";
//             res.status(400).send(errors);
//         } else {
//             req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//             console.log(User.firstName)
//             User.create(req.body)
//                 .then(user => {
//                     const newImage = new Image({
//                         type: 'user',
//                         user: user._id,
//                         url: req.file.filename
//                     })
//                     const data = [user, newImage];
//                     user.img = newImage._id;
//                     user.save();
//                     newImage.save();
//                     console.log(user);
//                     // Send current user to the front end
//                     res.send(user);
//                 })
//                 .catch(err => {
//                     if (!isValid) {
//                         res.status(400).send(errors);
//                     }else{
//                         console.log("Signup Error");
//                         res.send(err)
//                     }
//                 });
//         }
//     })
// });
// POST - log in user
// POST - create user (without image upload) delete when debugging is finished
authRouter.post('/signup', (req, res) => {
    console.log(req.sessionID);
    const {errors, isValid} = validateSignupInput(req.body);
    if (!isValid) {
        return res.status(400).send(errors);
    }
    // res.send("user creation endpoint has been reached");
    User.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            errors.email = "There is already a user with this email address";
            return res.status(400).send(errors);
        } else {
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            User.create(req.body)
                .then(user => {
                    req.session.currentUser = user;
                    return res.send(req.session);
                })
                .catch(err => {
                    return res.send(err);
                })
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

/*
How should sessions and cookies work - brainstorming
when user is created add session id to the user in the database
on frontend check cookie against the session id in the database
when the use logs out delete the session id from the database and destroy the cookie.

OR create a session store
session information is stored within the database
a cookie is sent to the browser with the session id
when a user closes the window or refreshes the page, the session collection is searched by the session id contained in the cookie.
If the cookie matches the session id, the user is automatically authenticated.
When the user logs out, the session is destroyed and removed from the database.

 */