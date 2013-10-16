var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    bookSchema,
    keywordsSchema;

keywordsSchema = new Schema({
    keyword: String
});

bookSchema = new Schema({
    title: String,
    author: String,
    releaseDate: Date,
    keywords: [keywordsSchema]
});

module.exports = mongoose.model('Book', bookSchema);