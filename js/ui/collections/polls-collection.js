define(
    'js/ui/collections/polls-collection',
    [
        'app',
        'js/ui/models/poll-model'
    ],
    function (App, pollModel) {
        return App.Collection.defaultCollection.extend({
            model: pollModel
        });
    }
);