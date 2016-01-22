define(
    'views/search',
    [
        'backbone',
        'text!../../templates/search.tpl',
        'collections/default-collection',
        'backgrid',
        'views/backgrid-columns-configs'
    ],
    function (Backbone, searchTemplate, defaultCollection, Backgrid, BackgridColumnsConfig) {
        function prepareTpl(tpl) {
            var re = /<tpl[\s\t]+id=\"((?!\")\w+)\"[\s\t]*>(((?!<\/tpl).)*)<\/tpl>/g;
            var templateCollection = {};

            tpl.replace(/(\r\n|\n|\r)/gm, "").replace(re, function (matchStr, id, template) {
                templateCollection[id] = template;
            });

            return templateCollection;
        }

        var templates = prepareTpl(searchTemplate);

        var tplSearch = templates['tplSearch'];
        var tplImageCell = templates['tplImageCell'];
        var tplTaglineCell = templates['tplTaglineCell'];
        var tplEngagementCell = templates['tplEngagementCell'];
        var tplButtonCell = templates['tplButtonCell'];

        return Backbone.View.extend({
            el: 'main',
            grid: {},
            columnsConfig: [],
            childs: {},
            events: {
                'click #search-btn': 'search'
            },
            myCollection: {},
            backgridColumnsProp: [],
            childs: {},
            initialize: function () {
                var self = this;

                self.myCollection = new defaultCollection();
                self.myCollection.parent = self;

                self.childs = {};

                self.initsBackgridColumnsConfig();

                self.render();

                
            },
            renderGrid: function () {
                var self = this;

                if (self.myCollection.length) {
                    self.$('#polls-div').html(self.grid.render().el);
                }
                else {
                    $('#polls-div').empty();
                }
            },
            render: function () {
                var self = this;

                self.$el.html(_.template(tplSearch));
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
                        keywords : $("#search-input").val()
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
                    columnsConfig = [],
                    templates = [tplImageCell, tplTaglineCell, tplEngagementCell, tplButtonCell];

                    console.error(1);
                    console.log(templates);

                $.each(self.backgridColumnsProp, function(columnCounter, column) {
                    
                    column.cell = self.renderBackgridCell(templates[columnCounter]);

                    columnsConfig.push(column);
                });

                self.columnsConfig = columnsConfig;
            },
            renderBackgridCell: function(columnTemplate) {
                var self = this;

                return Backgrid.Cell.extend({
                    render: function() {
                        var cell = this;
                        
                        cell.$el.html(_.template(columnTemplate, {
                            cellModel: cell.model,
                            cellUi: self.parent
                        }));

                        return cell;
                    }
                })
            },
            search: function (e) {
                var self = this;

                self.showLoader();

                $.when(self.getPolls()).then(
                    function (data) {
                        self.myCollection.reset();
                        self.myCollection.add(data[1]);
                        console.log('Знайдено:', self.myCollection);
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