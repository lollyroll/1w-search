var gulp = require('gulp');
var staticServer = require('node-static');
var bowerNormalizer = require('gulp-bower-normalize');

gulp.task('runLocalServer', function() {
    var fileServer = new staticServer.Server('app/');

    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            fileServer.serve(request, response);
        }).resume();
    }).listen(6040);
});

