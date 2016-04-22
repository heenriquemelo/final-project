// var express = require('express');
//     router = express.Router(),
//     path = require('path'),
//     User = require('../models/users.js'),
//     auth = require('../middlewares/auth.js');

// What if the email is not in the db?
// What is the pwd is wrong?
// Handle this later.
// var rightPwd = function (userEmail, pwd, callback) {
//     // if email === email in database and pwd === pwd in database return true

//     User.findOne({ email: userEmail }, function (err, obj) {
//         if (!obj || err) {
//             callback(err, false);
//         } else {
//             if (pwd === obj.password) {
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//     });
// };

module.exports = function(app, passport) {

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/signup', function (req, res) {
        res.render('signup');
    });

    app.post('/', passport.authenticate('local', { 
        successRedirect: '/stocks', 
        failureRedirect: '/' 
    }));

};