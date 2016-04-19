var express = require('express'),
    app = express(),
    path = require('path'),
    routes = require('./routes');


app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 8888);

app.use('/public', express.static(__dirname + '/public'));

app.use('/', routes);

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'));
});
