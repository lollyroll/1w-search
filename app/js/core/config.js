define(
    'config',
    function() {
        var config = {};

        config.environment = '/* @echo NODE_ENV */' || 'development';
        config.imagePath = '/* @echo IMG_PATH */' || 'http://localhost:6042/img/';

        return config;
    }
);