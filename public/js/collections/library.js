define([
    'underscore',
    'backbone',
    'models/book'
],

function (_, Backbone, Book) {

    var Library = Backbone.Collection.extend({
        model: Book,
        url: '/api/books'
    });

    return Library;

});
