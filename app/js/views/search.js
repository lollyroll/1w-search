define(
    'views/search',
    [
        'app',
        'collections/polls-collection',
        'backgrid',
        'views/backgrid-columns-configs',
        'text!../../templates/search.tpl'
    ],
    function (App, pollsCollection, Backgrid, BackgridColumnsConfig, tpl) {
        console.log(arguments);

        return App.View.defaultView.extend({
            el: '#main',
            grid: {},
            columnsConfig: [],
            events: {
                'click .js-search': 'search'
            },
            myCollection: {},
            backgridColumnsProp: [],
            childs: {},
            initialize: function () {
                var self = this;

                self.myCollection = new pollsCollection();
                self.myCollection.parent = self;

                self.initsBackgridColumnsConfig();
                self.render();
            },
            renderGrid: function () {
                var self = this;

                if (self.myCollection.length) {
                    self.$('#polls-list').html(self.grid.render().el);
                }
                else {
                    $('#polls-list').empty();
                }
            },
            render: function () {
                var self = this;

                self.templates = self.prepareTpl(tpl);
                self.$el.html(_.template(self.templates['tplSearch']));
            },
            getPolls: function(data) {
                return $.ajax({
                    url: 'https://qa.1worldonline.biz/1ws/json/PollSearchListWithPager',
                    data: {
                        keywords : data.keywords
                    }
                });
            },
            initsBackgridColumnsConfig: function() {
                var self = this;

                self.backgridColumnsProp = BackgridColumnsConfig.backgridColumnsProp;
            },
            initGrid: function() {
                var self = this;

                self.grid = new Backgrid.Grid({
                    columns: self.columnsConfig,
                    collection: self.myCollection
                });
            },
            constructBackgridConfig: function() {
                var self = this,
                    columnsConfig = [];

                $.each(self.backgridColumnsProp, function(columnCounter, column) {
                    column.cell = self.renderBackgridCell(column.template);
                    columnsConfig.push(column);
                });

                self.columnsConfig = columnsConfig;
            },
            renderBackgridCell: function(columnTemplate) {
                var self = this;

                return Backgrid.Cell.extend({
                    render: function() {
                        var cell = this;

                        cell.$el.html(_.template(self.templates[columnTemplate], {
                            cellModel: cell.model,
                            cellUi: self.parent
                        }));

                        return cell;
                    }
                })
            },
            search: function (e) {
                var self = this;
                var currentKeywords = $("#search-input").val();

                self.showLoader();

                $.when(self.getPolls({keywords: currentKeywords})).then(
                    function (data) {
                        self.myCollection.reset();
                        self.myCollection.add(data[1]);

                        self.constructBackgridConfig();
                        self.initGrid();

                        self.renderGrid();
                        self.hideLoader();
                    }
                );
            }
        });
    }
);