
var isAuthenticated = function (req, res, next) {
    if (req.session.isAuthenticated) {
        next();
    }
    else {
        res.status(401).send('You must be logged in to access the page!');
    }
};

module.exports = isAuthenticated;