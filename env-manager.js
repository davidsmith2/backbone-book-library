var express = require('express'),
    path = require('path');

var EnvManager = function (app) {
    var protocol = 'http',
        hostname = 'localhost',
        port = 4711,
        url = protocol + '://' + hostname + ':' + port,
        message = 'Express server listening on port %d in %s mode. Application running at ' + url + '.';

    this.init = function () {
        app.configure(function(){
            app.use(
                express.static(
                    path.join(
                        __dirname, 'public'
                    )
                )
            );
            app.use('/js/lib/', express.static('node_modules/requirejs/'));
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use(app.router);
            app.use(
                express.errorHandler({
                    dumpExceptions: true,
                    showStack: true
                })
            );
        });
        app.listen(port, function () {
            console.log(message, port, app.settings.env);
        });
    };
};

module.exports = EnvManager;
