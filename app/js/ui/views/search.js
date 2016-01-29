define(
    'ui/views/search',
    [
        'app',
        'ui/collections/polls-collection',
        'backgrid',
        'ui/views/backgrid-columns-configs',
        'text!templates/search.tpl',
        'ui/helpers/locales'
    ],
    function (App, pollsCollection, Backgrid, BackgridColumnsConfig, tpl, Languages) {
        return App.View.defaultView.extend({
            el: '#main',
            grid: {},
            columnsConfig: [],
            events: {
                'click .js-search': 'search',
                'click .showPopup': 'popup',
                'change #select-language': 'changeLocale'
            },
            myCollection: {},
            backgridColumnsProp: [],
            childs: {},
            locale: 'en',
            initialize: function () {
                var self = this;

                self.myCollection = new pollsCollection();
                self.myCollection.parent = self;

                self.initsBackgridColumnsConfig();
                self.render();
            },
            render: function () {
                var self = this;

                self.templates = self.prepareTpl(tpl);
                self.$el.html(_.template(self.templates['tplSearch']));

                self.showSelectLocale();
            },
            showSelectLocale: function() {
                var self = this;
                var localesDropdown = self.$('#select-language');
                var $select = $('select');

                $.each(Languages, function(count, locale){
                    $select.append($('<option>').val(count).text(locale.name));
                });

                localesDropdown.find('option[value=' + self.locale + ']').attr("selected", true);
            },
            changeLocale: function(e) {
                var self = this;

                self.locale = $(e.currentTarget).val();

                if($('#search-input').val() !== ''){
                    self.search();
                }
            },
            popup: function (e) {
                var currentTarget = $(e.currentTarget),
                    elements = $('.popupDiv'),
                    viewElement = currentTarget.parent().parent().find('.popupDiv');
                
                if ($(viewElement).is(':visible')) {
                    $(viewElement).hide();
                }
                else {
                    elements.hide();
                    $(viewElement).show();
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
                var self = this;
                var locale = self.locale;

                return $.ajax({
                    url: 'https://qa.1worldonline.biz/1ws/json/PollSearchListWithPager',
                    method: 'post',
                    data: {
                        minVotes: 1000,
                        locale: locale,
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
                });
            },
            search: function () {
                var self = this,
                    currentKeywords = $('#search-input').val();

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