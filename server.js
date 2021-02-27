const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const MONGO_URI = "mongodb://localhost:2017/tradr"
const port = 3000;

// view engine
app.set('view engine', 'ejs');

// middleware
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
// database connection
mongoose.connect(MONGO_URI, {useNewUrlParser: true}, () => console.log("Connected to database"));

// server listen
app.listen(port, () => console.log(`server is listening on port: ${port}`));