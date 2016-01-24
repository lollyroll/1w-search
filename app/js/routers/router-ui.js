define(
    [
        'app',
        'views/search'
    ],
    function (App, Search) {
        return App.Router.defaultRouter.extend({
            routes: {
                '(/)': 'search',
                'demo': 'demo'
            },
            search: function () {
                App.createPage({
                    templates: ['search', 'demo'],
                    css: ['search'],
                    view: Search,
                    urlArguments: arguments
                });
            },
            demo: function () {
                App.createPage({
                    templates: ['search'],
                    css: ['demo'],
                    urlArguments: arguments
                });
            }
        });
    }
);