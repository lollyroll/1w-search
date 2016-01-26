define(
    'views/search',
    [
        'app',
        'collections/polls-collection',
        'backgrid',
        'views/backgrid-columns-configs'
    ],
    function (App, pollsCollection, Backgrid, BackgridColumnsConfig) {
        return App.View.defaultView.extend({
            el: '#main',
            grid: {},
            columnsConfig: [],
            events: {
                'click .js-search': 'search',
                'click .showPopup': 'popup'
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
            render: function () {
                var self = this;

                self.templates = self.prepareTpl(self.rawTemplates);
                self.$el.html(_.template(self.templates['tplSearch']));
            },
            popup: function (e) {
                var self = this;
                var currentTarget = $(e.currentTarget);
                var elements = $('.popupDiv');
                var viewElement = currentTarget.parent().parent().find('.popupDiv');
                
                if($(viewElement).is(':visible')) {
                    $(viewElement).hide()
                } else {
                    elements.hide();
                    $(viewElement).show()
                }
            },
            renderGrid: function () {
                var self = this;

                if (self.myCollection.length) {
                    self.$('#polls-list').html(self.grid.render().el);
                }
                else {
                    $('#polls-list').empty();
                }

                $('.popupDiv').hide();
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