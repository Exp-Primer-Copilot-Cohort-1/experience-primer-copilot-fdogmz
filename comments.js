// create web server

// import express
const express = require('express');

// create express app
const app = express();

// import body-parser
const bodyParser = require('body-parser');

// import mongoose
const mongoose = require('mongoose');

// import path
const path = require('path');

// import comments model
const Comment = require('./models/comment');

// connect to mongoose
mongoose.connect('mongodb://localhost/comments');
mongoose.Promise = global.Promise;

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set view engine
app.set('view engine', 'ejs');

// set views directory
app.set('views', path.join(__dirname, 'views'));

// get all comments
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/index', { comments: comments });
        }
    });
});

// create new comment
app.post('/comments', (req, res) => {
    Comment.create(req.body.comment, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/comments');
        }
    });
});

// create new comment form
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

// start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

