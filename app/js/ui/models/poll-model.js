define(
    'ui/models/poll-model',
    [
        'app',
        'ui/helpers/format-poll-date'
    ],
    function(App, FormatPollDate) {
        return App.Model.defaultModel.extend({
            initialize: function() {
                var model = this;

                model.formatCreatedDate();
            },
            formatCreatedDate: function() {
                var model = this,
                    formattedDate = FormatPollDate(model.get('created'));

                model.set('newTime', formattedDate);
            }
        });
    }
);