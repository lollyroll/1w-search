define(
  [
   'backbone',
   'views/search'
  ],
   function(Backbone, Search){
     var BaseRouter = Backbone.Router.extend({
        routes: {
          '(/)' : 'index'
        },

        search: function() {
          search = new Search({ el: $('main') });
          search.render()
        }
     });

     var initialize = function(){
        var baseRouter = new BaseRouter();
        Backbone.history.start()
     };

     return { initialize: initialize };
   });