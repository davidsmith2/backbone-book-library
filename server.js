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

// keywords schema
var Keywords = new mongoose.Schema({
    keyword: String
});

// book schema
var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [Keywords]
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

// get books
app.get('/api/books', function(request, response){
    return BookModel.find(function(err, books){
        if (!err) {
            response.send(books);
        } else {
            return console.log(err);
        }
    });
});

// add a book
app.post('/api/books', function(request, response){
    var book = new BookModel({
        title: request.body.title,
        author: request.body.author,
        releaseDate: request.body.releaseDate,
        keywords: request.body.keywords
    });
    book.save(function(err){
        if (!err) {
            return console.log('created');
        } else {
            return console.log(err);
        }
    });
    return response.send(book);
});

// get a book
app.get('/api/books/:id', function(request, response){
    return BookModel.findById(request.params.id, function(err, book){
        if (!err) {
            return response.send(book);
        } else {
            return console.log(err);
        }
    });
});

// update a book
app.put('/api/books/:id', function(request, response){
    return BookModel.findById(request.params.id, function(err, book){
        book.title = request.body.title;
        book.author = request.body.author;
        book.releaseDate = request.body.releaseDate;
        book.keywords = request.body.keywords;
        return book.save(function(err){
            if (!err) {
                console.log('updated');
            } else {
                console.log(err);
            }
            return response.send(book);
        });
    });
});

// delete a book
app['delete']('/api/books/:id', function(request, response){
    return BookModel.findById(request.params.id, function(err, book){
        return book.remove(function(err){
            if (!err) {
                console.log('removed');
                return response.send('');
            } else {
                console.log(err);
            }
        });
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