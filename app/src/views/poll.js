define(
  'views/poll',
	[
	 'backbone',
	 'text!../../templates/search.tpl',
   'collections/polls-collection'
   ],
   function(Backbone, searchTemplate, pollsCollection) {

    function prepareTpl(tpl) {
        var re = /<tpl[\s\t]+id=\"((?!\")\w+)\"[\s\t]*>(((?!<\/tpl).)*)<\/tpl>/g;
        var templateCollection = {};

        tpl.replace(/(\r\n|\n|\r)/gm, "").replace(re, function(matchStr, id, template) {
            templateCollection[id] = template;
        });

        return templateCollection;
    }

    var templates = prepareTpl(searchTemplate);
    var mySuperTemplate = templates['tplPoll'];

    var pollView = Backbone.View.extend({
      el: '#polls-div',
      initialize: function () {
        var self = this;

      },
      render: function () {
        var self = this;

        self.$el.html(_.template(mySuperTemplate, {poll: self.model.toJSON()}));

        return self;
      }
    });

      return pollView;
   }
 );