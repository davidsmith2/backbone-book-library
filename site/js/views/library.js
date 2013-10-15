var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',
    events: {
        'click #add': 'addBook'
    },
    initialize: function(){
        this.collection = new app.Library();
        this.collection.fetch({reset: true});
        this.render();
        this.listenTo(this.collection, 'change', this.render);
    },
    render: function(){
        var table = $('#viewBooks tbody').empty();

        this.collection.each(function(book){

            var bookEntry = new app.BookView({
                model: book
            });

            table.append( bookEntry.render().el );

        });

        return this;
    },
    addBook: function(e){
        e.preventDefault();
        var formData = {};
        $('#addBook > div').children('input').each(function(i, el){
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