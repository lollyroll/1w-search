define(
    [
        'app'
    ],
    function (App) {
        return Backbone.Router.extend({
            initialize: function() {
                console.error('init default router');
                Backbone.history.start()
            }
        });
    }
);