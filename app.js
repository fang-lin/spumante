/**
 * Copyright 2006-2015 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var config = require('./config'),
    http = require('http'),
    express = require('express'),// Web application framework for node.
    bodyParser = require('body-parser'), // Node.js body parsing middleware.
    morgan = require('morgan'), // Logging middleware for node.js http apps.
    compression = require('compression'), // Node.js compression middleware.
    errorhandler = require('errorhandler'),// Create new middleware to handle errors and respond with content negotiation.
    mongoose = require('mongoose'),// Elegant mongodb object modeling for node.js.
    log4js = require('log4js'),// Port of Log4js to work with node.
    send = require('send'), // connect's static() file server extracted for general node.js use
    ejs = require('ejs'),
    clientServer = require('./server/clientServer'); // connect's static() file server extracted for general node.js use

// region logger

var logger = log4js.getLogger('app');
logger.setLevel(config.LOGGER);

// endregion logger

var app = express(),
    server = http.Server(app);

// region template engine

// set ejs template target is <&=...&>
ejs.delimiter = '&';

var viewExts = ['.html', '.js', '.css'];

viewExts.forEach(function (ext) {
    app.engine(ext, require('ejs').__express);
});

app.set('view engine', 'ejs');
app.set('views', config.CLIENT_DIR);

// endregion template engine
// region set header

app.set('x-powered-by', false);
app.use(function (req, res, next) {
    res.header('server', 'Spumante');
    next();
});

// endregion set header

if (config.ERRORHANDLER) {
    app.use(errorhandler());
}

if (config.COMPRESSION) {
    app.use(compression());
}

app.use(morgan(config.MORGAN));

app.use(clientServer({
    viewExts: viewExts,
    buster: config.BUSTER
}));

app.use(function (req, res, next) {
    res.status(404).end('404');
});

//app.use(config.API_BASE, bodyParser.json());
//app.use(config.API_BASE, apiRouters);

var port = process.env.PORT || config.PORT;
app.listen(port, function () {
    logger.info('Http server listening on port ' + port);
});

mongoose.connect(config.MONGODB_LINK, function () {
    logger.info('Mongoose connect to ' + config.MONGODB_LINK);
});