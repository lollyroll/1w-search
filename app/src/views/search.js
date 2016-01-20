define(
  'views/search',
	[
	 'backbone',
	 'text!../../templates/search.tpl',
   'collections/polls-collection',
   'views/poll'
   ],
   function(Backbone, searchTemplate, pollsCollection, pollView) {

    function prepareTpl(tpl) {
        var re = /<tpl[\s\t]+id=\"((?!\")\w+)\"[\s\t]*>(((?!<\/tpl).)*)<\/tpl>/g;
        var templateCollection = {};

        tpl.replace(/(\r\n|\n|\r)/gm, "").replace(re, function(matchStr, id, template) {
            templateCollection[id] = template;
        });

        return templateCollection;
    }

    var templates = prepareTpl(searchTemplate);
    var mySuperTemplate = templates['tplSearch'];

    var preparedTemplate = _.template(mySuperTemplate);

    var Search = Backbone.View.extend({
      el: 'main',
      events: {
        'click #search-btn' : 'search'
      },
      childs: {},
      initialize: function(options){
        var self = this;
        self.myCollection = pollsCollection.clone();
        self.myCollection.parent = self;

        self.render();
      },

      render: function(){
        var self = this;

        self.$el.html(preparedTemplate);
      },
      showLoader: function() {
        var self = this;

        $('#loaderDiv').show();
      },
      hideLoader: function() {
        var self = this;

        $('#loaderDiv').hide();
      },
      search: function (e) {
                var self = this,
                val = $('#search-input').val(),
                criteria,
                filtered;

                self.showLoader();

                $.ajax({
                    url: 'https://qa.1worldonline.biz/1ws/json/PollSearchListWithPager'
                }).done(function (data) {
                    self.myCollection.add(data[1]);
                    filtered = self.myCollection.filter(function (model) {
                        criteria = model.get('tagline').toLowerCase();
                        return criteria.indexOf(val.toLowerCase()) > -1;
                    });
                    self.myCollection.reset(filtered);

                    var myHtml = '';

                    self.$('#polls-div').empty();

                    self.myCollection.each(function (model, index) {
                        var pollName = 'poll' + index + 1;

                        self.childs[pollName] = pollView.extend({
                            model: model,
                            parent: self
                        });

                        var view = new self.childs[pollName]();

                        myHtml += view.render().$el.html();
                    });

                    self.$('#polls-div').html(myHtml);
                    self.hideLoader();
                });
            }
    });

      var search = new Search();

      return search;
   }
 );