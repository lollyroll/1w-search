/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports=function(e){"use strict";e.util.linefeed="\n",RegExp.quote=function(e){return e.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")};var t=require("fs"),n=require("path"),r=require("npm-shrinkwrap"),i=require("./grunt/bs-glyphicons-data-generator.js"),s=require("./grunt/bs-lessdoc-parser.js"),o=function(){var e=n.join(__dirname,"less/variables.less"),r=t.readFileSync(e,{encoding:"utf8"}),i=new s(r);return{sections:i.parseFile()}},u=require("./grunt/bs-raw-files-generator.js"),a=require("./grunt/bs-commonjs-generator.js"),f=e.file.readJSON("./grunt/configBridge.json",{encoding:"utf8"});Object.keys(f.paths).forEach(function(e){f.paths[e].forEach(function(e,t,r){r[t]=n.join("./docs/assets",e)})}),e.initConfig({pkg:e.file.readJSON("package.json"),banner:'/*!\n * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n * Licensed under the <%= pkg.license %> license\n */\n',jqueryCheck:f.config.jqueryCheck.join("\n"),jqueryVersionCheck:f.config.jqueryVersionCheck.join("\n"),clean:{dist:"dist",docs:"docs/dist"},jshint:{options:{jshintrc:"js/.jshintrc"},grunt:{options:{jshintrc:"grunt/.jshintrc"},src:["Gruntfile.js","package.js","grunt/*.js"]},core:{src:"js/*.js"},test:{options:{jshintrc:"js/tests/unit/.jshintrc"},src:"js/tests/unit/*.js"},assets:{src:["docs/assets/js/src/*.js","docs/assets/js/*.js","!docs/assets/js/*.min.js"]}},jscs:{options:{config:"js/.jscsrc"},grunt:{src:"<%= jshint.grunt.src %>"},core:{src:"<%= jshint.core.src %>"},test:{src:"<%= jshint.test.src %>"},assets:{options:{requireCamelCaseOrUpperCaseIdentifiers:null},src:"<%= jshint.assets.src %>"}},concat:{options:{banner:"<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>",stripBanners:!1},bootstrap:{src:["js/transition.js","js/alert.js","js/button.js","js/carousel.js","js/collapse.js","js/dropdown.js","js/modal.js","js/tooltip.js","js/popover.js","js/scrollspy.js","js/tab.js","js/affix.js"],dest:"dist/js/<%= pkg.name %>.js"}},uglify:{options:{compress:{warnings:!1},mangle:!0,preserveComments:"some"},core:{src:"<%= concat.bootstrap.dest %>",dest:"dist/js/<%= pkg.name %>.min.js"},customize:{src:f.paths.customizerJs,dest:"docs/assets/js/customize.min.js"},docsJs:{src:f.paths.docsJs,dest:"docs/assets/js/docs.min.js"}},qunit:{options:{inject:"js/tests/unit/phantom.js"},files:"js/tests/index.html"},less:{compileCore:{options:{strictMath:!0,sourceMap:!0,outputSourceFiles:!0,sourceMapURL:"<%= pkg.name %>.css.map",sourceMapFilename:"dist/css/<%= pkg.name %>.css.map"},src:"less/bootstrap.less",dest:"dist/css/<%= pkg.name %>.css"},compileTheme:{options:{strictMath:!0,sourceMap:!0,outputSourceFiles:!0,sourceMapURL:"<%= pkg.name %>-theme.css.map",sourceMapFilename:"dist/css/<%= pkg.name %>-theme.css.map"},src:"less/theme.less",dest:"dist/css/<%= pkg.name %>-theme.css"}},autoprefixer:{options:{browsers:f.config.autoprefixerBrowsers},core:{options:{map:!0},src:"dist/css/<%= pkg.name %>.css"},theme:{options:{map:!0},src:"dist/css/<%= pkg.name %>-theme.css"},docs:{src:["docs/assets/css/src/docs.css"]},examples:{expand:!0,cwd:"docs/examples/",src:["**/*.css"],dest:"docs/examples/"}},csslint:{options:{csslintrc:"less/.csslintrc"},dist:["dist/css/bootstrap.css","dist/css/bootstrap-theme.css"],examples:["docs/examples/**/*.css"],docs:{options:{ids:!1,"overqualified-elements":!1},src:"docs/assets/css/src/docs.css"}},cssmin:{options:{compatibility:"ie8",keepSpecialComments:"*",sourceMap:!0,advanced:!1},minifyCore:{src:"dist/css/<%= pkg.name %>.css",dest:"dist/css/<%= pkg.name %>.min.css"},minifyTheme:{src:"dist/css/<%= pkg.name %>-theme.css",dest:"dist/css/<%= pkg.name %>-theme.min.css"},docs:{src:["docs/assets/css/ie10-viewport-bug-workaround.css","docs/assets/css/src/pygments-manni.css","docs/assets/css/src/docs.css"],dest:"docs/assets/css/docs.min.css"}},csscomb:{options:{config:"less/.csscomb.json"},dist:{expand:!0,cwd:"dist/css/",src:["*.css","!*.min.css"],dest:"dist/css/"},examples:{expand:!0,cwd:"docs/examples/",src:"**/*.css",dest:"docs/examples/"},docs:{src:"docs/assets/css/src/docs.css",dest:"docs/assets/css/src/docs.css"}},copy:{fonts:{expand:!0,src:"fonts/*",dest:"dist/"},docs:{expand:!0,cwd:"dist/",src:["**/*"],dest:"docs/dist/"}},connect:{server:{options:{port:3e3,base:"."}}},jekyll:{options:{config:"_config.yml"},docs:{},github:{options:{raw:"github: true"}}},htmlmin:{dist:{options:{collapseWhitespace:!0,conservativeCollapse:!0,minifyCSS:!0,minifyJS:!0,removeAttributeQuotes:!0,removeComments:!0},expand:!0,cwd:"_gh_pages",dest:"_gh_pages",src:["**/*.html","!examples/**/*.html"]}},jade:{options:{pretty:!0,data:o},customizerVars:{src:"docs/_jade/customizer-variables.jade",dest:"docs/_includes/customizer-variables.html"},customizerNav:{src:"docs/_jade/customizer-nav.jade",dest:"docs/_includes/nav/customize.html"}},htmllint:{options:{ignore:['Attribute "autocomplete" not allowed on element "button" at this point.','Attribute "autocomplete" is only allowed when the input type is "color", "date", "datetime", "datetime-local", "email", "month", "number", "password", "range", "search", "tel", "text", "time", "url", or "week".','Element "img" is missing required attribute "src".']},src:"_gh_pages/**/*.html"},watch:{src:{files:"<%= jshint.core.src %>",tasks:["jshint:core","qunit","concat"]},test:{files:"<%= jshint.test.src %>",tasks:["jshint:test","qunit"]},less:{files:"less/**/*.less",tasks:"less"}},sed:{versionNumber:{pattern:function(){var t=e.option("oldver");return t?RegExp.quote(t):t}(),replacement:e.option("newver"),exclude:["dist/fonts","docs/assets","fonts","js/tests/vendor","node_modules","test-infra"],recursive:!0}},"saucelabs-qunit":{all:{options:{build:process.env.TRAVIS_JOB_ID,throttled:10,maxRetries:3,maxPollRetries:4,urls:["http://127.0.0.1:3000/js/tests/index.html?hidepassed"],browsers:e.file.readYAML("grunt/sauce_browsers.yml")}}},exec:{npmUpdate:{command:"npm update"}},compress:{main:{options:{archive:"bootstrap-<%= pkg.version %>-dist.zip",mode:"zip",level:9,pretty:!0},files:[{expand:!0,cwd:"dist/",src:["**"],dest:"bootstrap-<%= pkg.version %>-dist"}]}}}),require("load-grunt-tasks")(e,{scope:"devDependencies"}),require("time-grunt")(e),e.registerTask("validate-html",["jekyll:docs","htmllint"]);var l=function(e){return!process.env.TWBS_TEST||process.env.TWBS_TEST===e},c=function(e){return e===undefined||e!=="0"},h=[];l("core")&&process.env.TRAVIS_REPO_SLUG!=="twbs-savage/bootstrap"&&(h=h.concat(["dist-css","dist-js","csslint:dist","test-js","docs"])),l("validate-html")&&c(process.env.TWBS_DO_VALIDATOR)&&h.push("validate-html"),typeof process.env.SAUCE_ACCESS_KEY!="undefined"&&l("sauce-js-unit")&&c(process.env.TWBS_DO_SAUCE)&&(h.push("connect"),h.push("saucelabs-qunit")),e.registerTask("test",h),e.registerTask("test-js",["jshint:core","jshint:test","jshint:grunt","jscs:core","jscs:test","jscs:grunt","qunit"]),e.registerTask("dist-js",["concat","uglify:core","commonjs"]),e.registerTask("less-compile",["less:compileCore","less:compileTheme"]),e.registerTask("dist-css",["less-compile","autoprefixer:core","autoprefixer:theme","csscomb:dist","cssmin:minifyCore","cssmin:minifyTheme"]),e.registerTask("dist",["clean:dist","dist-css","copy:fonts","dist-js"]),e.registerTask("default",["clean:dist","copy:fonts","test"]),e.registerTask("change-version-number","sed"),e.registerTask("build-glyphicons-data",function(){i.call(this,e)}),e.registerTask("build-customizer",["build-customizer-html","build-raw-files"]),e.registerTask("build-customizer-html","jade"),e.registerTask("build-raw-files","Add scripts/less files to customizer.",function(){var t=e.template.process("<%= banner %>");u(e,t)}),e.registerTask("commonjs","Generate CommonJS entrypoint module in dist dir.",function(){var t=e.config.get("concat.bootstrap.src"),n="dist/js/npm.js";a(e,t,n)}),e.registerTask("docs-css",["autoprefixer:docs","autoprefixer:examples","csscomb:docs","csscomb:examples","cssmin:docs"]),e.registerTask("lint-docs-css",["csslint:docs","csslint:examples"]),e.registerTask("docs-js",["uglify:docsJs","uglify:customize"]),e.registerTask("lint-docs-js",["jshint:assets","jscs:assets"]),e.registerTask("docs",["docs-css","lint-docs-css","docs-js","lint-docs-js","clean:docs","copy:docs","build-glyphicons-data","build-customizer"]),e.registerTask("prep-release",["dist","docs","jekyll:github","htmlmin","compress"]),e.registerTask("update-shrinkwrap",["exec:npmUpdate","_update-shrinkwrap"]),e.registerTask("_update-shrinkwrap",function(){var n=this.async();r({dev:!0,dirname:__dirname},function(r){r&&e.fail.warn(r);var i="test-infra/npm-shrinkwrap.json";t.renameSync("npm-shrinkwrap.json",i),e.log.writeln("File "+i.cyan+" updated."),n()})})};