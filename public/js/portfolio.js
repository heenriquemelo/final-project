$(function () {
    $.get('/stockslist', function (stocks) {
        // Use EJS template to display ONE stock.
        // Iterate through this template using a for loop for each stock.
        var count = 0;
        for (var i = 0; i < stocks.length; i++) {
            var params = {symbol: stocks[i].symbol};
            $.get('/stockdata', params, function (data) {
                for (var x = 0; x < stocks.length; x++) {
                    if (stocks[x].name === data.name) {
                        stocks[x].currentPrice = data.lastPrice;
                        if (stocks[x].currentPrice > stocks[x].priceBought) {
                            var percentReturn = '+ ' + ((stocks[x].currentPrice/stocks[x].priceBought - 1)*100).toFixed(2);
                        } else if (stocks[x].currentPrice == stocks[x].priceBought) {
                            var percentReturn = 0.00;
                        } else {
                            var percentReturn = '- ' + ((1 - stocks[x].currentPrice/stocks[x].priceBought)*100).toFixed(2);
                        }
                        stocks[x].percentReturn = percentReturn;
                    }
                }
                if (++count === stocks.length) {
                    console.log(stocks);
                    var template = new EJS({url: '../public/js/portfolio-template.ejs'});
                    template.update('stocks-bought', {stocks: stocks});
                }
            });
        }
    });
});