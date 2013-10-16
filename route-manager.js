var fs = require('fs'),
    path = require('path');

var RouteManager = function (app) {
    var directory = 'routes',
        files = fs.readdirSync(directory);

    this.init = function () {
        files.forEach(function (file) {
            var filePath = path.resolve('./', directory, file),
                route = require(filePath);

            route.init(app);
        });
    };
};

module.exports = RouteManager;
