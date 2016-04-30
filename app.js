var express = require('express'),
    app = express(),
    logger = require('morgan'),
    session = require('express-session'),
    uuid = require('node-uuid'),
    favicon = require('serve-favicon'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    loginRouter = require('./routes/login'),
    stocksRouter = require('./routes/stocks'),
    handleError = require('./middlewares/handleError'),
    pageNotFound = require('./middlewares/pageNotFound');

app.set('views', __dirname + '/views');
app.set('port', process.env.PORT || 8888);
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

var secretMaker = function () {
    return 'iamsoawesome' + uuid.v4();
};

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: secretMaker() }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/public', express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.png'));

require('./middlewares/auth')(passport);

loginRouter(app, passport);

stocksRouter(app);

app.use(handleError);

app.use(pageNotFound);

app.listen(app.get('port'), function () {
    console.log('Listening on port: ' + app.get('port'));
});
