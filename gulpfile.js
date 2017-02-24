/*jshint esversion: 6*/

// MODULES ----------------------------------------------------------
//===================================================================
var gulp   = require('gulp'),
    args   = require('yargs').argv,
    config = require('./gulp.config')();

// GULP PLUGINS ------------------------------------------------------
//====================================================================
var $ = require('gulp-load-plugins')({ lazy: true });

// STATIC VARS  -------------------------------------------------------
//=====================================================================
var port = process.env.PORT || config.defaultPort;

gulp.task('vet', ()=> {
    gulp.src(config.allJs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('serve-dev', function() {
    var isDev = true;

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };
    return $.nodemon(nodeOptions)
            .on('restart', ['vet'], function(ev) {
                log('*** node server restarted');
                log('files changed on restart:\n' + ev + '***');
            })
            .on('start', function() {
                log ('*** node server started ***');
            })
            .on('crash', function() {
                log('*** node server crashed: script error ***');
            })
            .on('exit', function() {
                log('*** node server exited cleanly ***');
            });
});

/*gulp.task('debug-dev', function() {
    var isDev = true;

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.node-inspector(nodeOptions)
            .on('restart', ['vet'], function(ev) {
                log('*** node server restarted');
                log('files changed on restart:\n' + ev + '***');
            })
            .on('start', function() {
                log ('*** node server started ***');
            })
            .on('crash', function() {
                log('*** node server crashed: script error ***');
            })
            .on('exit', function() {
                log('*** node server exited cleanly ***');
            });
});
*/

gulp.task('debug-dev', function() {
 
  gulp.src([])
    .pipe($.nodeInspector());
});

gulp.task('test', ['vet'], ()=> {
    return gulp.src(config.mochaTests, { read: false })
        .pipe($.mocha({
            reporter: 'spec'
        }))
        .once('error', () => {
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        });
        //startTests(true, done);
});

gulp.task('build', function() {
    gulp.src(['./package.json', './bower.json',])
        .pipe($.install());
});

// UTILITY FUNCTIONS -------------------------------------------------
//====================================================================
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if  (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

/*function startTests(singleRun, done) {
    var karma = require('karma').server;
    var excludedFiles = [];
    var serverSpecs = config.serverIntegrationSpecs;

    excludedFiles = serverSpecs;

     karma.start({
         configFile: __dirname + '/karma.conf.js',
         exclude: excludedFiles,
         singleRun: !!singleRun
     }, karmaCompleted);

     function karmaCompleted(karmaResult) {
         log('Karma completed!');
         if (karmaResult === 1) {
             done('karma: tests failed with code: ' + karmaResult);
         } else {
             done();
         }
     }
}*/