define(
    'views/backgrid-columns-configs',

    function() {
        var config = {};

        config.backgridColumnsProp = [
            { name: 'image',      label: '', editable: false, sortable: false},
            { name: 'tagline',    label: 'TAGLINE', editable: false, sortable: false},
            { name: 'engagement', label: 'ENGAGEMENT', editable: false, sortable: false},
            { name: 'button',    label: '', editable: false, sortable: false}
        ];

        return config;
    }
); 