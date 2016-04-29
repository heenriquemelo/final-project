var isLoggedIn = require('../middlewares/isLoggedIn'),
    stocksApi = require('../models/apiData.js');

module.exports = function(app) {

    // add isLoggedIn!!!
    app.get('/stocks', function (req, res) {
        res.render('stocks', {
            name: null,
            symbol: null,
            lastPrice: null,
            open: null,
            change: null,
            percentChange: null
        });
    });

    app.get('/endpoint', function (req, res) {

        // req.query for GET, req.body for POST.
        var symbol = req.query.symbol;
        var query = 'symbol=' + symbol;

        var stockHandler = function (err, data) {
            if (err) {
                console.log(err);
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

    app.post('/stockdata', function (req, res) {
        var stockdata = req.body;
        
        // findOne - cuurent user. Populate('ugigu');

        res.json('Success!');
    });
};