define(
    'ui/views/search',
    [
        'app',
        'ui/collections/polls-collection',
        'backgrid',
        'ui/views/backgrid-columns-configs',
        'text!templates/search.tpl',
        'ui/helpers/locales',
        'ui/helpers/to-friendly-number',
        'jqueryui'
    ],
    function (App, pollsCollection, Backgrid, BackgridColumnsConfig, tpl, Languages, FriendlyNum) {
        return App.View.defaultView.extend({
            el: '#main',
            grid: {},
            columnsConfig: [],
            events: {
                'click .js-search': 'search',
                'click .showPopup': 'popup',
                'input #search-input': 'hidePollsList'
            },
            myCollection: {},
            backgridColumnsProp: [],
            childs: {},
            locale: 'en',
            initialize: function () {
                var self = this;

                $(document).on('click', function(e) {
                    self.hidePopup(e);
                });

                self.myCollection = new pollsCollection();
                self.myCollection.parent = self;

                self.initsBackgridColumnsConfig();
                self.render();

                $(document).on('click', '#select-language-menu li', function(e){
                    self.changeLocale(e);
                });
            },
            render: function () {
                var self = this;

                self.templates = self.prepareTpl(tpl);
                self.$el.html(_.template(self.templates['tplSearch']));

                self.showSelectLocale();
                self.addFlagsToLocaleSelector();
            },
            showSelectLocale: function() {
                var self = this,
                    localesDropdown = self.$('#select-language');

                var $options = [];

                $.each(Languages, function(locale, localeObj){
                    var $option = $('<option>').val(locale).text(localeObj.name);

                    if (locale === self.locale) {
                        $option.prop('selected', true);
                    }

                    $options.push($option);
                });

                localesDropdown.html($options);
            },
            addFlagsToLocaleSelector: function() {
                $.widget( 'custom.iconselectmenu', $.ui.selectmenu, {
                  _renderItem: function( ul, item ) {
                    var li = $( '<li>', { text: item.label, value: item.value, class: 'lang-' + item.element.attr( 'value' ) } );

                    if ( item.disabled ) {
                      li.addClass( 'ui-state-disabled' );
                    }

                    $( '<span>', {
                      'class': 'ui-icon ' + item.element.attr( 'value' )
                    })
                      .appendTo( li );

                    $('#select-language-button').addClass('lang-en');

                    return li.appendTo( ul );
                  }
                });

                $( '#select-language' )
                .iconselectmenu();


                $( '<span>', {
                  'class': 'ui-icon en',
                  'id': 'buttonIcon'
                })
                  .prependTo( $('.ui-selectmenu-button') );
            },
            changeLocale: function(e) {
                var self = this;

                $('#buttonIcon').removeClass('ui-icon '+ self.locale +'');
                $('#select-language-button').removeClass('lang-' + self.locale);
                self.locale = $(e.currentTarget).attr('value');
                $('#buttonIcon').addClass('ui-icon '+ self.locale +'');
                $('#select-language-button').addClass('lang-' + self.locale);
                self.search();
            },
            hidePollsList: function() {
                if($('#search-input').val() === '')
                {
                    $('#polls-list').empty();
                }
            },
            popup: function (e) {
                var currentTarget = $(e.currentTarget),
                    elements = $('.popupDiv'),
                    trParent = $('.active'),
                    self = this,
                    viewElement = currentTarget.parent().parent().find('.popupDiv'),
                    sourceColumn  = self.grid.columns.find(function(column) {
                        return column.get('name').search('source') > -1;
                    });

                if ($(viewElement).is(':visible')) {
                    $(viewElement).hide();
                    trParent.removeClass('active');
                    sourceColumn.set('renderable', true);
                }
                else {
                    elements.hide();
                    trParent.removeClass('active');
                    $(viewElement).show();
                    $(viewElement).parent().parent().addClass('active');
                    sourceColumn.set('renderable', false);
                }
            },
            hidePopup: function(e) {
                var self = this;

                if (!$(e.target).hasClass('popupDiv') && !$(e.target).parent().hasClass('popupDiv')
                && !$(e.target).parent().parent().hasClass('popupDiv')
                && !$(e.target).hasClass('showPopup'))
                {
                    $('.popupDiv').hide();
                    $('.active').removeClass('active');
                }

                if($('.popupDiv').is(':hidden') && !$(e.target).hasClass('popupDiv')
                && !$(e.target).parent().hasClass('popupDiv')
                && !$(e.target).parent().parent().hasClass('popupDiv')
                && !$(e.target).hasClass('showPopup'))
                {
                    var sourceColumn  = self.grid.columns.find(function(column) {
                        return column.get('name').search('source') > -1;
                    });

                    sourceColumn.set('renderable', true);
                }
            },
            renderGrid: function () {
                var self = this,
                    $pollsList = self.$('#polls-list');

                if (self.myCollection.length) {
                    $pollsList.html(self.grid.render().el);
                }
                else {
                    $pollsList.empty();
                }

                $('.popupDiv').hide();
            },
            getPolls: function(data) {
                var self = this;
                var locale = self.locale;

                return $.ajax({
                    url: 'https://1worldonline.com/1ws/json/PollSearchListWithPager',
                    method: 'post',
                    data: {
                        minVotes: 100,
                        sortCriteria: 'mostVoted',
                        includePublicPollsOnly: true,
                        locale: locale,
                        keywords : data.keywords,
                        pageSize: 20
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
                        var cell = this,
                            totalViewsFormatted = FriendlyNum(cell.model.get('totalViews'), 1),
                            totalVotesFormatted = FriendlyNum(cell.model.get('totalVotes'), 1);

                        cell.model.set({'totalViewsFormatted': totalViewsFormatted});
                        cell.model.set({'totalVotesFormatted': totalVotesFormatted});

                        cell.$el.html(_.template(self.templates[columnTemplate], {
                            cellModel: cell.model,
                            cellUi: self.parent
                        }));

                        return cell;
                    }
                });
            },
            search: function() {
                var self = this,
                    currentKeywords = $('#search-input').val().trim();

                if (currentKeywords){
                    self.showLoader();

                    $.when(self.getPolls({ keywords: currentKeywords })).then(
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
            }
        });
    }
);
