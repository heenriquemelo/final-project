var User = require('../models/users.js').User;

module.exports = function(app, passport) {

    app.get('/', function (req, res, next) {
        res.render('index');
    });

    app.post('/', passport.authenticate('local', { 
            successRedirect: '/stocks', 
            failureRedirect: '/'
        }
    ));

    app.get('/signup', function (req, res, next) {
        res.render('signup');
    });

    app.post('/signup', function (req, res, next) {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;

        var newUser = new User({ name: name, email: email, password: password });

        newUser.save(function(err, obj) {
            if (err) {
                next(err);
            } else {
                res.redirect('/');
            }
        });
    });

};