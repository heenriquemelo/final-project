
var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401);
        res.render('error', {
            statusCode: res.statusCode,
            message: 'You must be logged in to access this page!'
        });
    }
};

module.exports = isLoggedIn;