define([
    'jquery',
    'underscore',
    'backbone',
    'views/library',
    'jquery-ui'
],

function ($, _, Backbone, LibraryView) {

    var App = function () {
        this.views.library = new LibraryView();

        console.log($('#releaseDate'))

        $('#releaseDate').datepicker();
    };

    App.prototype = {
        views: {}
    };

    return App;

});
