define(
    'collections/default-collection',
    [
        'backbone',
        'models/default-model'
    ],
    function (Backbone, defaultModel) {
        return Backbone.Collection.extend({
            model: defaultModel
        });
    }
);