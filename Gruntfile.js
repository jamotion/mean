'use strict';

var paths = {
  js: ['*.js', 'test/**/*.js', '!test/coverage/**', '!bower_components/**', 'packages/**/*.js', '!packages/**/node_modules/**'],
  html: ['packages/**/public/**/views/**', 'packages/**/server/views/**'],
  css: ['!bower_components/**', 'packages/**/public/**/css/*.css'],
  less: ['!bower_components/**', 'packages/**/public/**/css/*.less', 'assets/css/*.less']
};

module.exports = function (grunt) {

  if (process.env.NODE_ENV !== 'production') {
    require('time-grunt')(grunt);
  }

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    assets: grunt.file.readJSON('config/assets.json'),
    clean: ['bower_components/build'],
    watch: {
      js: {
        files: paths.js,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      html: {
        files: paths.html,
        options: {
          livereload: true,
          interval: 500
        }
      },
      less: {
        files: paths.less,
        tasks: ['less'],
        options: {
          livereload: true
        }
      },
      css: {
        files: paths.css,
        tasks: ['csslint'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: paths.js,
        options: {
          jshintrc: true
        }
      }
    },
    uglify: {
      core: {
        options: {
          mangle: false
        },
        files: '<%= assets.core.js %>'
      }
    },
    less: {
      app: {
        files: [
          {
            expand: true,
            cwd: 'packages/',
            src: '**/*.less',
            dest: 'packages/',
            ext: '.css'
          }
        ]
      },
      bootstrap: {
        files: {
          'assets/css/bootstrap.css': 'assets/css/bootstrap.less'
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: paths.css
    },
    cssmin: {
      core: {
        files: '<%= assets.core.css %>'
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: [],
          ignore: ['node_modules/**'],
          ext: 'js,html,less',
          nodeArgs: ['--debug'],
          delayTime: 1,
          cwd: __dirname
        }
      }
    },
    concurrent: {
      tasks: ['nodemon', 'watch', 'open'],
      options: {
        logConcurrentOutput: true
      }
    },
    open: {
      main: {
        path: 'http://localhost:3000/',
        app: 'firefox',
        options: {
          delay: 5
        }
      }
    },
    mochaTest: {
      options: {
        reporter: 'spec',
        require: [
          'server.js',
          function () {
            require('meanio/lib/util').preload(__dirname + '/packages/**/server', 'model');
          }
        ]
      },
      src: ['packages/**/server/tests/**/*.js']
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  //Load NPM tasks
  require('load-grunt-tasks')(grunt);

  //Default task(s).
  if (process.env.NODE_ENV === 'production') {
    grunt.registerTask('default', ['clean', 'less', 'cssmin', 'uglify', 'concurrent']);
  } else {
    grunt.registerTask('default', ['clean', 'less', 'jshint', 'csslint', 'concurrent']);
  }

  //Test task.
  grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit']);

  // For Heroku users only.
  // Docs: https://github.com/linnovate/mean/wiki/Deploying-on-Heroku
  grunt.registerTask('heroku:production', ['cssmin', 'uglify']);
};