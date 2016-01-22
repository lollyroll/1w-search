define(
    'views/poll',
    [
        'app',
        'text!../../templates/search.tpl'
    ],
    function (App, searchTemplate) {
        return App.View.defaultView.extend({
            el: '#polls-div',
            initialize: function () {
                var self = this;

                console.error('init view: ' + self.name);
            },
            render: function () {
                var self = this;
                var templates = self.prepareTpl(searchTemplate);

                self.$el.html(_.template(templates['tplPoll'], { poll: self.model.toJSON() }));

                return self.$el.html();
            }
        });
    }
);