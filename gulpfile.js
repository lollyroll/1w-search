var gulp = require('gulp');
var staticServer = require('node-static');
var mainBowerFiles = require('main-bower-files');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var requirejsOptimize = require('gulp-requirejs-optimize');
var eslint = require('gulp-eslint');

gulp.task('default', ['lint'], function() {
    console.error('default task');
});

gulp.task('lint', function () {
    return gulp.src(['app/js/views/**/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
});

gulp.task('runLocalServer', function() {
    var fileServer = new staticServer.Server('app/');

    require('http').createServer(function (request, response) {
        request.addListener('end', function () {
            fileServer.serve(request, response);
        }).resume();
    }).listen(6040);
});

gulp.task('build-core-min-js', function() {
    return gulp.src(['./app/js/core/main-core.js'])

        .pipe(requirejsOptimize({
            baseUrl: './app',
            name: 'js/core/main-core',
            mainConfigFile: 'app/js/core/main-core.js',
            //optimize: 'uglify2',
            optimize: 'none',
            throwWhen: {
                optimize: true
            },
            findNestedDependencies: true,
            paths: {
                requireLib: './js/core/libs/require-2.1.22',
                'requirejs-config': 'empty'
            },
            include: ['requireLib'],
            optimizeAllPluginResources: true,
            preserveLicenseComments: false
        }))
        .pipe(concat('core.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build-ui-min-js', function() {
    return gulp.src(['./app/js/ui/main-ui.js'])

        .pipe(requirejsOptimize({
            baseUrl: './app',
            name: 'js/ui/main-ui',
            mainConfigFile: 'app/js/ui/main-ui.js',
            //optimize: 'uglify2',
            optimize: 'none',
            throwWhen: {
                optimize: true
            },
            findNestedDependencies: true,
            paths: {
                requireLib: './js/core/libs/require-2.1.22'
            },
            include: ['requireLib'],
            optimizeAllPluginResources: true,
            preserveLicenseComments: false
        }))
        .pipe(concat('ui.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compile-scss', function() {
    return gulp.src('./app/scss/**/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'app/css',
            sass: 'app/scss'
        }))
        .pipe(gulp.dest('./app/css'));
});

gulp.task('compass-watch', function() {
    gulp.watch('app/scss/**/*.scss', ['compile-scss']);
});

gulp.task('main-js-core', ['main-js-backbone', 'main-js-requirejs', 'main-js-core-requirejs-plugins']);

gulp.task('main-js-backbone', function() {
    return gulp.src(mainBowerFiles(['**/backbone/*.js', '**/underscore/*.js', '**/jquery.js']))
        .pipe(gulp.dest('./app/js/libs2'));
});

gulp.task('main-js-requirejs', function() {
    return gulp.src(mainBowerFiles(['**/requirejs/*.js']))
        .pipe(gulp.dest('./app/js/libs2'));
});

gulp.task('main-js-core-requirejs-plugins', function() {
    return gulp.src(mainBowerFiles(['**/text.js']))
        .pipe(gulp.dest('./app/js/libs2/requirejs-plugins'));
});

/*install backgrid*/
gulp.task('main-backgrid', ['main-backgrid-js', 'main-backgrid-css']);

gulp.task('main-backgrid-js', ['main-js-backgrid', 'main-js-backgrid-filter', 'main-js-backgrid-paginator']);

gulp.task('main-backgrid-css', ['main-css-backgrid', 'main-css-backgrid-filter', 'main-css-backgrid-paginator']);

gulp.task('main-js-backgrid', function() {
    return gulp.src(mainBowerFiles(['**/backgrid.js']))
        .pipe(gulp.dest('./app/js/libs2/backbone-plugins/backgrid'));
});

gulp.task('main-css-backgrid', function() {
    return gulp.src(mainBowerFiles(['**/backgrid.css']))
        .pipe(gulp.dest('./app/css/libs/backbone-plugins/backgrid'));
});

gulp.task('main-js-backgrid-filter', function() {
    return gulp.src(mainBowerFiles(['**/backgrid-filter.js']))
        .pipe(gulp.dest('./app/js/libs2/backbone-plugins/backgrid'));
});

gulp.task('main-css-backgrid-filter', function() {
    return gulp.src(mainBowerFiles(['**/backgrid-filter.js']))
        .pipe(gulp.dest('./app/css/libs/backbone-plugins/backgrid'));
});

gulp.task('main-js-backgrid-paginator', function() {
    return gulp.src(mainBowerFiles(['**/backgrid-paginator.js']))
        .pipe(gulp.dest('./app/js/libs2/backbone-plugins/backgrid'));
});

gulp.task('main-css-backgrid-paginator', function() {
    return gulp.src(mainBowerFiles(['**/backgrid-paginator.css']))
        .pipe(gulp.dest('./app/css/libs/backbone-plugins/backgrid'));
});
/* install backgrid */

/* START: install bootstrap to project */
gulp.task('main-bootstrap', ['main-js-bootstrap', 'main-scss-bootstrap-main', 'main-fonts-bootstrap']);

gulp.task('main-js-bootstrap', function() {
    return gulp.src(mainBowerFiles(['**/bootstrap/*.js', '**/bootstrap.js']))
        .pipe(gulp.dest('./app/js/libs2/bootstrap'));
});

gulp.task('main-scss-bootstrap-main', ['main-scss-bootstrap'], function() {
    return gulp.src(mainBowerFiles(['**/_bootstrap.scss']))
        .pipe(gulp.dest('./app/scss/libs/bootstrap'));
});

gulp.task('main-scss-bootstrap', ['main-scss-bootstrap-mixins'], function() {
    return gulp.src(mainBowerFiles(['**/bootstrap/*.scss']))
        .pipe(gulp.dest('./app/scss/libs/bootstrap/bootstrap'));
});

gulp.task('main-scss-bootstrap-mixins', function() {
    return gulp.src(mainBowerFiles(['**/bootstrap/mixins/*.scss']))
        .pipe(gulp.dest('./app/scss/libs/bootstrap/bootstrap/mixins'));
});

gulp.task('main-fonts-bootstrap', function() {
    return gulp.src(mainBowerFiles('**/bootstrap/*.{eot,svg,ttf,woff,woff2}'))
        .pipe(gulp.dest('./app/fonts/libs/bootstrap'));
});
/* END: install bootstrap to project */
