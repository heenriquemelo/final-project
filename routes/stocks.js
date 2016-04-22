var isLoggedIn = require('../middlewares/isLoggedIn');

module.exports = function(app) {
    app.get('/stocks', isLoggedIn, function (req, res) {
        res.send('Stocks page accessed!');
    });
};