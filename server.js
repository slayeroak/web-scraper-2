// dependencies
const express = require('express');
const bParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

let PORT = process.env.PORT || 3000;
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/news_scraper';

// initialize express
const app = express();

//middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// database configuration
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true, userMongoClient: true});

// check connection status
let db = mongoose.connection;
db.on('error', (error)=>{
    console.log(`Connection error ${error}`);
});

// routes
require('./routes/route')(app);

// start server
app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`);
});