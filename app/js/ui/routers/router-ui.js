define(
    'ui/routers/router-ui',
    [
        'app',
        'ui/views/search',
        'ui/views/demo',
        'ui/views/eye'
    ],
    function (App, Search, Demo, Eye) {
        return App.Router.defaultRouter.extend({
            routes: {
                '(/)': 'search',
                'demo': 'demo',
                'popup': 'popup',
                'eye': 'eye'
            },
            search: function () {
                App.createPage({
                    //templates: ['search'],
                    css: ['search'],
                    view: Search,
                    urlArguments: arguments
                });
            },
            demo: function () {
                App.createPage({
                    //templates: ['demo'],
                    css: ['demo'],
                    view: Demo,
                    urlArguments: arguments
                });
            },
            eye: function () {
                App.createPage({
                    //templates: ['eye'],
                    css: ['eye'],
                    view: Eye,
                    urlArguments: arguments
                });
            }
        });
    }
);
