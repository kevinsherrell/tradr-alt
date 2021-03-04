const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const imageRouter = express.Router();
const Image = require('../model/Image.js');


module.exports = imageRouter;