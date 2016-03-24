define(
    'ui/routers/router-ui',
    [
        'app',
        'ui/views/search',
        'ui/views/eye'
    ],
    function (App, Search, Eye) {
        return App.Router.defaultRouter.extend({
            routes: {
                '(/)': 'search',
                'eye': 'eye'
            },
            search: function () {
                App.createPage({
                    css: ['search', 'jqueryui/jqueryui'],
                    view: Search,
                    urlArguments: arguments
                });
            },
            eye: function () {
                App.createPage({
                    css: ['eye'],
                    view: Eye,
                    urlArguments: arguments
                });
            }
        });
    }
);
