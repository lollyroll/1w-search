define(
    'models/poll-model',
    [
        'app'
    ],
    function(App) {
        return App.Model.defaultModel.extend({
            initialize: function() {
                var model = this;
                var time = new Date(model.get('created'));
                var mon=time.getMonth();
                var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
                'September', 'October', 'November', 'December'];
                var day=time.getDay();
                var year=time.getFullYear();
                var newTime=month[mon]+' '+day+','+year;
                model.set('newTime', newTime);
            }
        });
    }
);