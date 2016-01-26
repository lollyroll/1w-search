define(
    [
        'app',
        'views/search',
        'views/demo'
    ],
    function (App, Search, Demo) {
        return App.Router.defaultRouter.extend({
            routes: {
                '(/)': 'search',
                'demo': 'demo',
                'popup': 'popup'
            },
            search: function () {
                App.createPage({
                    templates: ['search'],
                    css: ['search'],
                    view: Search,
                    urlArguments: arguments
                });
            },
            demo: function () {
                App.createPage({
                    templates: ['demo'],
                    css: ['demo'],
                    view: Demo,
                    urlArguments: arguments
                });
            }
        });
    }
);