var express = require('express'),
    app = express(),
    path = require('path'),
    cookieSession = require('cookie-session'),
    uuid = require('node-uuid'),
    bodyParser = require('body-parser'),
    loginRouter = require('./routes/login'),
    stocksRouter = require('./routes/stocks'),
    isAuthenticated = require('./middlewares/isAuthenticated'),
    User = require('./models/users.js');

app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 8888);
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({extended: false}));

var secretMaker = function () {
    return 'iamsoawesome' + uuid.v4();
};

app.use(cookieSession({secret: secretMaker()}));
app.use('/public', express.static(__dirname + '/public'));

app.use('/', loginRouter);

app.use('/stocks', isAuthenticated, stocksRouter);

app.listen(app.get('port'), function() {
    console.log('Listening on port: ' + app.get('port'));
});
