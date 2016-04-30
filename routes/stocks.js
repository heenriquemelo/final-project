var isLoggedIn = require('../middlewares/isLoggedIn'),
    stocksApi = require('../models/apiData.js'),
    db = require('../models/users.js');

module.exports = function(app) {

    app.get('/stocks', isLoggedIn, function (req, res) {
        res.render('stocks');
    });

    // Endpoint that has the API data pulled from MarketOnDemand
    app.get('/stockdata', isLoggedIn, function (req, res) {

        // req.query for GET, req.body for POST.
        var symbol = req.query.symbol;
        var query = 'symbol=' + symbol;

        var stockHandler = function (err, data) {
            if (err) {
                console.log(err);
            } else if (JSON.parse(data.JSON).hasOwnProperty('Message')) {
                res.json({message: 'Invalid stock! Try something like AAPL, MSFT or GPRO.'});
            } else {
                var jsonData = JSON.parse(data.JSON);
                res.json({
                    name: jsonData.Name,
                    symbol: jsonData.Symbol,
                    lastPrice: jsonData.LastPrice,
                    open: jsonData.Open,
                    change: jsonData.ChangeYTD,
                    percentChange: jsonData.ChangePercentYTD.toFixed(2)
                });
            }
        };

        stocksApi(query, stockHandler);

    });

    // Endpoint that has the data from the stocks bought that was sent through JQuery.
    app.post('/stockbought', isLoggedIn, function (req, res) {
        var stockbought = req.body;

        db.User.findByIdAndUpdate(
            req.session.passport.user,
            {$push: {'stocks': stockbought}},
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            }
        );

        res.json('Success!');
    });

    app.get('/portfolio', isLoggedIn, function (req, res) {
        res.render('portfolio');
    });

    app.get('/stockslist', isLoggedIn, function (req, res) {
        db.User.findOne({_id: req.session.passport.user}, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                res.json(user.stocks);
            }
        });
    });

};












