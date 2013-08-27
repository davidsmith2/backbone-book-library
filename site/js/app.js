var app = app || {};

$(function(){
    var books = [
        {
            title: 'Developing Backbone.js Applications',
            author: 'Addy Osmani',
            releaseDate: '2013',
            keywords: 'JavaScript, Web Development'
        },
        {
            title: 'CSS Mastery',
            author: 'Andy Budd',
            releaseDate: '2006',
            keywords: 'CSS, Web Design'
        },
        {
            title: 'HTML & XHTML: The Definitive Guide, Sixth Edition',
            author: 'Chuck Musciano',
            releaseDate: '2007',
            keywords: 'HTML, Web Design'
        }
    ];

    new app.LibraryView( books );
});