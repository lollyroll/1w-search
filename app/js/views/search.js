define(
    'views/search',
    [
        'app',
        'text!../../templates/search.tpl',
        'views/poll',
        'collections/polls-collection'
    ],
    function (App, searchTemplate, pollView, pollsCollection) {
        function prepareTpl(tpl) {
            var re = /<tpl[\s\t]+id=\"((?!\")\w+)\"[\s\t]*>(((?!<\/tpl).)*)<\/tpl>/g;
            var templateCollection = {};

            tpl.replace(/(\r\n|\n|\r)/gm, "").replace(re, function (matchStr, id, template) {
                templateCollection[id] = template;
            });

            return templateCollection;
        }

        var templates = prepareTpl(searchTemplate);

        var mySuperTemplate = templates['tplSearch'];

        var preparedTemplate = _.template(mySuperTemplate);

        return App.View.defaultView.extend({
            el: 'main',
            events: {
                'click #search-btn': 'search'
            },
            childs: {},
            initialize: function () {
                var self = this;

                self.myCollection = new pollsCollection();
                self.myCollection.parent = self;

                self.render();
            },
            render: function () {
                var self = this;

                self.$el.html(preparedTemplate);
            },
            showLoader: function () {
                $('#loaderDiv').show();
            },
            hideLoader: function () {
                $('#loaderDiv').hide();
            },
            getPolls: function(data) {
                return $.ajax({
                    url: 'https://qa.1worldonline.biz/1ws/json/PollSearchListWithPager',
                    data: {
                        keyword: data.keyword
                    }
                });
            },
            search: function (e) {
                var self = this,
                    keyword = $(e.currentTarget).val();

                self.showLoader();

                $.when(self.getPolls({keyword: keyword})).then(
                    function (data) {
                        self.myCollection.add(data[1]);

                        console.log('self.myCollection', self.myCollection);

                        var myHtml = '';

                        self.$('#polls-div').empty();

                        self.myCollection.each(function (model, index) {
                            var viewName = 'view-' + index;

                            self.childs[viewName] = pollView.extend({
                                name: viewName,
                                model: model,
                                parent: self
                            });

                            var view = new self.childs[viewName]();

                            myHtml += view.render();
                        });

                        self.$('#polls-div').html(myHtml);

                        self.hideLoader();
                    },
                    function (dataError) {
                        console.error('did not find polls');
                    }
                );
            }
        });
    }
);