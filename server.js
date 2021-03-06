const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();
const session = require('express-session');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

const MONGO_URI = process.env.MONGO_URI
const port = process.env.PORT;
const isAuthenticated = require('./validation/isAuthenticated');
// views engine
app.set('view engine', 'ejs');


// Main entry point to application
app.get('/', (req, res)=>{
    res.render('index');
})
// middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// routes
app.use('/auth', require('./controller/auth.js'));
app.use('/user', isAuthenticated, require('./controller/users.js'));
app.use('/seed', require('./controller/users.js'));
app.use('/listing', isAuthenticated,require('./controller/listings.js'));
// database connection
mongoose.connect(MONGO_URI, {useNewUrlParser: true}, () => console.log("Connected to database"));

// server listen
app.listen(port, () => console.log(`server is listening on port: ${port}`));


// Current Issues -
//      Data order does not match the models.
// Temporary solution: Data is in correct order when I manually order of the object to match schema in res.send();