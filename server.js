// module dependencies
var applicationRoot = __dirname,
    express = require('express'),
    path = require('path'),
    mongoose = require('mongoose');

// create server
var app = express();

// connect to database
mongoose.connect('mongodb://localhost/library_database');

// schemas
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date
});

// models
var BookModel = mongoose.model('Book', Book);

// configure server
app.configure(function(){

    // where to serve static content
    app.use(
        express.static(
            path.join(
                applicationRoot, 'site'
            )
        )
    );

    // parses request body and populates request body
    app.use(express.bodyParser());

    // checks request body for HTTP method overrides
    app.use(express.methodOverride());

    // perform route lookup based on URL and HTTP method
    app.use(app.router);

    // show all errors in development
    app.use(
        express.errorHandler({
            dumpExceptions: true,
            showStack: true
        })
    );

});

// routes
app.get('/api', function(request, response){
    response.send('Library API is running');
});

app.get('/api/books', function(request, response){
    return BookModel.find(function(err, books){
        if (!err) {
            response.send(books);
        } else {
            return console.log(err);
        }
    });
});

// start server
var protocol = 'http',
    hostname = 'localhost',
    port = 4711,
    url,
    message;

url = protocol + '://' + hostname + ':' + port;

message = 'Express server listening on port %d in %s mode. Application running at ' + url + '.';

app.listen(port, function(){
    console.log(message, port, app.settings.env);
});