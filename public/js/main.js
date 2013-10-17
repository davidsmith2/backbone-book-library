requirejs.config({
    baseUrl: '/js/',
    paths: {
        'jquery':               'lib/jquery.min',
        'underscore':           'lib/underscore-min',
        'backbone':             'lib/backbone-min',
        'jquery-form':          'lib/jquery/plugins/jquery.form',
        'text':                 'lib/text/text',
        'jquery-ui':            'lib/jquery-ui-1.10.3.custom.min',
        'jquery-dateFormat':    'lib/jquery.dateFormat-1.0'
    },
	shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'jquery-dateFormat': {
            deps: ['jquery']
        }
	}
});

require(['app'], function (App) {
    window.bbb = new App();
});