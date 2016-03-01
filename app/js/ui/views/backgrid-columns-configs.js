define(
    'ui/views/backgrid-columns-configs',

    function() {
        var config = {};

        config.backgridColumnsProp = [
            { name: 'image',      template: 'tplImageCell',      label: '',           renderable: true, editable: false, sortable: false },
            { name: 'tagline',    template: 'tplTaglineCell',    label: 'TAGLINE',    renderable: true, editable: false, sortable: false },
            { name: 'engagement', template: 'tplEngagementCell', label: 'ENGAGEMENT', renderable: true, editable: false, sortable: false },
            { name: 'source',    template: 'tplSourceCell',    label: '',           renderable: true, editable: false, sortable: false },
            { name: 'button',     template: 'tplButtonCell',     label: '',           renderable: true, editable: false, sortable: false },
            { name: 'popup',      template: 'tplPopupDiv',       label: '',           renderable: true, editable: false, sortable: false }
        ];

        return config;
    }
);
