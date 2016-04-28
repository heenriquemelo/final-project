var isLoggedIn = require('../middlewares/isLoggedIn'),
    stocksApi = require('../models/apiData.js');

module.exports = function(app) {

    // add isLoggedIn in later!!
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
                    percentChange: jsonData.ChangePercentYTD
                });
            }
        };

        stocksApi(query, stockHandler);

    });
};