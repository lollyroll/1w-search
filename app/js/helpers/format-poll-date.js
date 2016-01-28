define(
    'js/helpers/format-poll-date',
    [
        'js/helpers/localization'
    ],
    function(Localization) {
        return function(date) {
            var currentDate = new Date(date),
                month = currentDate.getMonth(),
                day = currentDate.getDay(),
                year = currentDate.getFullYear();

            return Localization.get('monthsNames')[month] + ' ' + day + ', ' + year;
        };
    }
);