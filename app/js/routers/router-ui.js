define(
    [
        'app',
        'views/search'
    ],
    function (App, Search) {
        return App.Router.defaultRouter.extend({
            routes: {
                '(/)': 'search'
            },
            search: function () {
                var search = new Search({
                    el: $('main')
                });

                search.render()
            }
        });
    }
);