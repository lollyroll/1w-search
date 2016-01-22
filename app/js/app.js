define(
    'app',
    [
        'views/default-view',
        'collections/default-collection',
        'models/default-model',
        'routers/default-router'
    ],
    function(defaultView, defaultCollection, defaultModel, defaultRouter) {
        var App = {
            View: {
                defaultView: defaultView
            },
            Model: {
                defaultModel: defaultModel
            },
            Collection: {
                defaultCollection: defaultCollection
            },
            Router: {
                defaultRouter: defaultRouter
            }
        };

        return App;
    }
);