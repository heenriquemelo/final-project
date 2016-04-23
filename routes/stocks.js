var isLoggedIn = require('../middlewares/isLoggedIn');

module.exports = function(app) {
    app.get('/stocks', isLoggedIn, function (req, res) {
        res.render('stocks');
    });

    app.post('/stocks', isLoggedIn, function (req, res) {
        // handle what happens to req.body.symbol
    });
};