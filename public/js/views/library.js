define([
    'jquery',
    'underscore',
    'backbone',
    'collections/library',
    'views/book',
    'jquery-ui'
],

function ($, _, Backbone, Library, BookView) {

    var LibraryView = Backbone.View.extend({

        el: '#library',
        events: {
            'click #add': 'addBook'
        },
        initialize: function(){
            this.collection = new Library();
            this.collection.fetch({reset: true});
            this.render();
            this.listenTo(this.collection, 'reset', this.render);
            this.listenTo(this.collection, 'add', this.renderBook);
        },
        render: function(){
            var self = this;

            this.collection.each(function (book) {
                self.renderBook(book);
            }, this);

            return this;
        },
        renderBook: function (book) {
            var bookView = new BookView({model: book}).render().el;
            this.$('#booksTable tbody').append(bookView);
        },
        addBook: function(e){
            e.preventDefault();
            var formData = {};
            $('#bookForm > div').children('input').each(function(i, el){
                if ($(el).val() !== '') {
                    if (el.id === 'keywords') {
                        formData[el.id] = [];
                        _.each($(el).val().split(', '), function(keyword){
                            formData[el.id].push({'keyword': keyword});
                        });
                    } else if (el.id === 'releaseDate') {
                        formData[el.id] = $('#releaseDate').datepicker('getDate').getTime();
                    } else {
                        formData[el.id] = $(el).val();
                    }
                    $(el).val('');
                }
            });
            this.collection.create(formData);
        }
    });

    return LibraryView;

});
