define(
    'views/poll',
    [
        'app',
        'text!../../templates/search.tpl'
    ],
    function (App, searchTemplate) {
        function prepareTpl(tpl) {
            var re = /<tpl[\s\t]+id=\"((?!\")\w+)\"[\s\t]*>(((?!<\/tpl).)*)<\/tpl>/g;
            var templateCollection = {};

            tpl.replace(/(\r\n|\n|\r)/gm, "").replace(re, function (matchStr, id, template) {
                templateCollection[id] = template;
            });

            return templateCollection;
        }

        var templates = prepareTpl(searchTemplate);
        var mySuperTemplate = templates['tplPoll'];

        return App.View.defaultView.extend({
            el: '#polls-div',
            initialize: function () {
                var self = this;

                console.error('init view: ' + self.name);
            },
            render: function () {
                var self = this;

                self.$el.html(_.template(mySuperTemplate, { poll: self.model.toJSON() }));

                return self.$el.html();
            }
        });
    }
);