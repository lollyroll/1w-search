require(
    [
        '../requirejs-config'
    ],
    function () {
        require(
            [
                'app'
            ],
            function(App) {
                console.log(App);
            }
        );
    }
);