const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const imageRouter = express.Router();
const Image = require('../model/Image.js');
const multer = require('multer');
const upload = multer({dest: '../public/images'});

imageRouter.post('/',(req, res)=>{

})
imageRouter.get('/all/:listing', (req, res)=>{
    Image.find({user: req.params.listing})
        .then(images=>{
            res.send(images)
        })
        .catch(err=>res.send(err))
})
// find one image by id
imageRouter.get('/:id', (req,res)=>{
    Image.findById(req.params.id)
        .then(image=>res.send(image))
        .catch(err=>res.send(err))
})
module.exports = imageRouter;