define(
    'ui/views/backgrid-columns-configs',

    function() {
        var config = {};

        config.backgridColumnsProp = [
            { name: 'image',      template: 'tplImageCell',      label: '',           editable: false, sortable: false },
            { name: 'tagline',    template: 'tplTaglineCell',    label: 'TAGLINE',    editable: false, sortable: false },
            { name: 'engagement', template: 'tplEngagementCell', label: 'ENGAGEMENT', editable: false, sortable: false },
            { name: 'button',     template: 'tplButtonCell',     label: '',           editable: false, sortable: false },
            { name: 'popup',      template: 'tplPopupDiv',        label: '',           editable: false, sortable: false }
        ];

        return config;
    }
);