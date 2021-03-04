const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const imageRouter = express.Router();
const Image = require('../model/Image.js');
const multer = require('multer');
const upload = multer({dest: '../public/images'});

imageRouter.post('/',(req, res)=>{

})

module.exports = imageRouter;