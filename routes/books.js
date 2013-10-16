var BookModel = require('../models/book.js');

module.exports.init = function (app) {

    app.get('/api/books', function(request, response){
        return BookModel.find(function (err, books) {
            if (!err) {
                response.send(books);
            } else {
                return console.log(err);
            }
        });
    });

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

    app.get('/api/books/:id', function(request, response){
        return BookModel.findById(request.params.id, function(err, book){
            if (!err) {
                return response.send(book);
            } else {
                return console.log(err);
            }
        });
    });

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

};
