var express = require('express'),
    mongoose = require('mongoose'),
    EnvManager = require('./env-manager.js'),
    RouteManager = require('./route-manager.js');

var app = module.exports = express(),
    envManager = new EnvManager(app),
    routeManager = new RouteManager(app);

mongoose.connect('mongodb://localhost/library_database');
envManager.init();
routeManager.init();
