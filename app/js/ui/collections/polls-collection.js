define(
    'ui/collections/polls-collection',
    [
        'app',
        'ui/models/poll-model'
    ],
    function (App, pollModel) {
        return App.Collection.defaultCollection.extend({
            model: pollModel
        });
    }
);