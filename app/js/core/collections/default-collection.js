define(
    'js/core/collections/default-collection',
    [
        'backbone',
        'js/core/models/default-model'
    ],
    function (Backbone, defaultModel) {
        return Backbone.Collection.extend({
            model: defaultModel
        });
    }
);