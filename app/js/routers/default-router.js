define(
    [
        'backbone'
    ],
    function (Backbone) {
        return Backbone.Router.extend({
            initialize: function() {
                console.error('init default router');
                Backbone.history.start()
            }
        });
    }
);