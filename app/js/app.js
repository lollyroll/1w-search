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

        App.createPage = function(params) {
            var templatesArr = params.templates || [];
            var cssArr = params.css || [];
            var View = params.view || App.View.defaultView;
            var urlArguments = Array.prototype.slice.apply(params.urlArguments);

            addCss(cssArr);

            var ExtendedView = View.extend({
                urlArguments: urlArguments
            });

            new ExtendedView();
        };

        function addCss(cssArr) {
            injectCss(cssArr);
            addCssScopes(cssArr);
        }

        function injectCss(cssArr) {
            var head = document.getElementsByTagName('head')[0],
                cssTags = document.createDocumentFragment(),
                index = cssArr.length,
                cssTag;

            while (index--) {
                cssTag = document.createElement('link');
                cssTag.setAttribute('rel', 'stylesheet');
                cssTag.setAttribute('href', 'css/' + cssArr[index] + '.css');
                cssTags.appendChild(cssTag);
            }

            head.appendChild(cssTags);
        }

        function addCssScopes(cssArr) {
            var body = document.getElementsByTagName('body')[0],
                DEFAULT_CLASS_NAMES = 'default';

            body.className = '';
            body.className = DEFAULT_CLASS_NAMES + ' ' + cssArr.join(' ');
        }

        return App;
    }
);