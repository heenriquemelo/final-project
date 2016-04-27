var request = require('request');

var pullStockData = function (query, callback) {
    var url = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?' + query;
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            callback(null, {query: query, JSON: body}); 
        } else if (!error && response.statusCode !== 200) {
            var err = new Error('Got invalid status code!');
            callback(err);
        } else {
            callback(error);
        }
    });
};

module.exports = pullStockData;
