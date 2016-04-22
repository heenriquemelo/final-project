
var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).send('You must be logged in to access the page!');
    }
};

module.exports = isLoggedIn;