define(
    'models/poll-model',
    [
        'app'
    ],
    function(App) {
        return App.Model.defaultModel.extend({
            initialize: function() {
                console.error('init poll model');
            }
        });
    }
);