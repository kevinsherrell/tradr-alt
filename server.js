const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const MONGO_URI = process.env.MONGO_URI
const port = process.env.PORT;
const isAuthenticated = require('./validation/isAuthenticated');

// Main entry point to application
app.get('/', (req, res) => {
    res.render('index');
})
// middleware
// app.use(cors());
app.use(cors({
    origin: "http://localhost:3000",
    methods:['GET','POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type','Authorization','Origin','Accept', 'X-Requested-With'],
    credentials: true,
    exposedHeaders: ['set-cookies']
}));

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
mongoose.connect(MONGO_URI, {useNewUrlParser: true}, () => console.log("Connected to database"));

const store = MongoStore.create({
    mongoUrl: MONGO_URI
})

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: store,
    cookie: {
        httpOnly: true,
        path: '/',
        secure: false,
        maxAge: 1000 * 60 * 60,
    },


}))
// routes
app.use('/auth',require('./controller/auth.js'));
app.use('/user', require('./controller/users.js'));
app.use('/seed', require('./controller/users.js'));
app.use('/listing', require('./controller/listings.js'));
app.use('/image', require('./controller/image.js'))
// database connection
// server listen
app.listen(port, () => console.log(`server is listening on port: ${port}`));


// Current Issues -
//      Data order does not match the models.
// Temporary solution: Data is in correct order when I manually order of the object to match schema in res.send();