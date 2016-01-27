require.config({
    baseUrl: './',
    paths: {
        collections: 'js/collections',
        models: 'js/models',
        views: 'js/views',
        routers: 'js/routers',
        app: 'js/app',
        'router-ui': 'js/router-ui',

        jquery: 'js/libs/jquery-2.2.0',
        underscore: 'js/libs/underscore-1.6.0',
        backbone: 'js/libs/backbone-amd-1.1.0',
        text: 'js/libs/requirejs-plugins/text-2.0.12',
        backgrid: 'js/libs/backbone-plugins/backgrid'
    }
});

define(
    'main',
    function() {
        require(['router-ui'], function(RouterUi) {
            new RouterUi();

            return false;
        });

        return false;
    }
);