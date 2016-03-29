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
                    localesDropdown = self.$el.find('#select-language'),
                    $options = [],
                    $option;

                $.each(Languages, function(locale, localeFullName) {
                    $option = $('<option>').val(locale).text(localeFullName.name);

                    if (locale === self.locale) {
                        $option.prop('selected', true);
                    }

                    $options.push($option);
                });

                localesDropdown.html($options);
            },
            addFlagsToLocaleSelector: function() {
                var self = this;

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

                    self.$el.find('#select-language-button').addClass('lang-en');

                    return li.appendTo( ul );
                  }
                });

                self.$el.find('#select-language').iconselectmenu();

                $( '<span>', {
                  'class': 'ui-icon en',
                  'id': 'buttonIcon'
                })
                .prependTo( self.$el.find('.ui-selectmenu-button') );
            },
            changeLocale: function(e) {
                var self = this,
                    buttonIcon = self.$el.find('#buttonIcon'),
                    selectLanguageButton = self.$el.find('#select-language-button');

                buttonIcon.removeClass('ui-icon '+ self.locale +'');
                selectLanguageButton.removeClass('lang-' + self.locale);
                self.locale = $(e.currentTarget).attr('value');
                buttonIcon.addClass('ui-icon '+ self.locale +'');
                selectLanguageButton.addClass('lang-' + self.locale);
                self.search();
            },
            hidePollsList: function(e) {
                var self = this;

                if (self.$el.find('#search-input').val().trim() === '') {
                    self.$el.find('#polls-list').empty();
                }
            },
            popup: function (e) {
                var self = this,
                    currentTarget = self.$el.find(e.currentTarget),
                    elements = self.$el.find('.popupDiv'),
                    trParent = self.$el.find('.active'),
                    viewElement = currentTarget.parent().parent().find('.popupDiv'),
                    sourceColumn  = self.grid.columns.find(function(column) {
                        return column.get('name').search('source') > -1;
                    });

                    trParent.removeClass('active');
                if (self.$el.find(viewElement).is(':visible')) {
                    self.$el.find(viewElement).hide();
                    sourceColumn.set('renderable', true);
                }
                else {
                    elements.hide();
                    self.$el.find(viewElement).show();
                    self.$el.find(viewElement).parent().parent().addClass('active');
                    sourceColumn.set('renderable', false);
                }
            },
            hidePopup: function(e) {
                var self = this,
                    currentTarget = $(e.target),
                    targetHasClassShowPopup = currentTarget.hasClass('showPopup'),
                    targetHasClassPopupDiv = currentTarget.hasClass('popupDiv'),
                    targetParentHasClassPopupDiv = currentTarget.parent().hasClass('popupDiv'),
                    targetParentParentHasClassPopupDiv = currentTarget.parent().parent().hasClass('popupDiv');

                if (!targetHasClassPopupDiv
                && !targetParentHasClassPopupDiv
                && !targetParentParentHasClassPopupDiv
                && !targetHasClassShowPopup)
                {
                    self.$el.find('.popupDiv').hide();
                    self.$el.find('.active').removeClass('active');
                }

                if(self.$el.find('.popupDiv').is(':hidden')
                && !targetHasClassPopupDiv
                && !targetParentHasClassPopupDiv
                && !targetParentParentHasClassPopupDiv
                && !targetHasClassShowPopup)
                {
                    var sourceColumn  = self.grid.columns.find(function(column) {
                        return column.get('name').search('source') > -1;
                    });

                    sourceColumn.set('renderable', true);
                }
            },
            renderGrid: function () {
                var self = this,
                    $pollsList = self.$el.find('#polls-list');

                if (self.myCollection.length) {
                    $pollsList.html(self.grid.render().el);
                }
                else {
                    $pollsList.empty();
                }

                self.$el.find('.popupDiv').hide();
            },
            getPolls: function(data) {
                var self = this;

                return $.ajax({
                    url: 'https://1worldonline.com/1ws/json/PollSearchListWithPager',
                    method: 'post',
                    data: {
                        minVotes: 100,
                        sortCriteria: 'mostVoted',
                        includePublicPollsOnly: true,
                        locale: self.locale,
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
                    currentKeywords = self.$el.find('#search-input').val().trim();

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
