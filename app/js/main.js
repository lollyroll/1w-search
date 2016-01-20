require(
    [
        'requirejs-config'
    ],
    function () {
        require(
            [
                'routers/default-router'
            ],
            function(BaseRouter) {
                new BaseRouter();
            }
        );
    }
);