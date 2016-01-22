require(
    [
        'requirejs-config'
    ],
    function () {
        require(
            [
                'routers/router-ui'
            ],
            function(RouterUi) {
                new RouterUi();
            }
        );
    }
);