$(function () {
    $.get('/stockslist', function (stocks) {
        // Use EJS template to display ONE stock.
        // Iterate through this template using a for loop for each stock.
        for (var i = 0; i < stocks.length; i++) {
            var params = {symbol: stocks[i].symbol};
            $.get('/stockdata', params, function (data) {
                stocks[i][currentPrice] = data.lastPrice;
            });
        }
        // DONT PUT GET INSIDE A FOR LOOP
        console.log(stocks);
        var template = new EJS({url: '../public/js/portfolio-template.ejs'});
        template.update('stocks-bought', {stocks: stocks});
    });
});