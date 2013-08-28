var app = app || {};

app.Book = Backbone.Model.extend({
    defaults: {
        coverImage: 'img/placeholder.png',
        title: 'No title',
        author: 'Unknown',
        releaseDate: 'Unknown',
        keywords: 'None'
    },
    initialize: function(options){
        if (options.coverImage) {
            this.set('coverImage', 'img/' + options.coverImage);
        }
    },
    parse: function(response){
        response.id = response._id;
        return response;
    }
});