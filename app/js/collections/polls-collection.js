define(
    'collections/polls-collection',
    [
        'app',
        'models/poll-model'
    ],
    function (App, pollModel) {
        return App.Collection.defaultCollection.extend({
            model: pollModel
        });
    }
);