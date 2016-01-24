require(
    [
        '../requirejs-config'
    ],
    function () {
        require(
            [
                'js/ui/routers/router-ui'
            ],
            function(RouterUi) {
                new RouterUi();
            }
        );
    }
);