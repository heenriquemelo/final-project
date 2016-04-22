var express = require('express');
    router = express.Router(),
    path = require('path'),
    User = require('../models/users.js');

// What if the email is not in the db?
// What is the pwd is wrong?
// Handle this later.
var rightPwd = function (email, pwd) {
    /
    / if email === email in database and pwd === pwd in database return true

/*    var userEmail = User.findOne({ email: req.body.email }, function (err, obj) {
        if (err) {
            return false;
        } else {
            return true;
        }
    });*/

    if (email === 'admin' && pwd === '1234') {
        return true;
    } else {
        return false;
    }
};

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/signup', function (req, res) {
    res.render('signup');
});

router.post('/', function (req, res) {
    // If rightPwd -> then req.session.isAuthenticated = true;
    if (rightPwd(req.body.email, req.body.password)) {
        req.session.isAuthenticated = true;
        res.send('Logged in!');
    } else {
        res.send('Wrong email-password combination!');
    }
});

module.exports = router;