module.exports = function (grunt) {
  'use strict';

  var copies = (function () {
        var _copies = [];
        try { _copies = require('./copies.js') } catch (e) {}
        return _copies;
      })(),
      files = [
          'js/*.js',
          'styles/*.css',
          'templates/**/*',
          'preview.png',
          'fotorama.php',
          'theme-info.php'
      ],
      defaultTasks = 'sass autoprefixer cssmin uglify clean copy'.split(' ');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n * <%= pkg.title %> <%= pkg.version %> | <%= pkg.homepage %>\n */\n',
    sass: {
      options: {
        style: 'expanded'
      },
      main: {
        files: [{
          expand: true,
          cwd: 'styles/src/sass',
          src: ['*.s*ss'],
          dest: 'styles/src',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      main: {
        files: [{
          expand: true,
          cwd: 'styles/src',
          src: ['*.css'],
          dest: 'styles/src'
        }]
      }
    },
    cssmin: {
      options: {
        banner: '<%= banner %>'
      },
      'styles/<%= pkg.name %>.css': 'styles/src/*.css'
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        preserveComments: 'some'
      },
      'js/<%= pkg.name %>.js': 'js/src/*.js'
    },
    clean: {
      options: {
        force: true
      },
      copies: (function () {
        return copies.map(function (path) {
          return path + 'themes/<%= pkg.name %>-master/'
        });
      })()
    },
    copy: {
      copies: {
        files: (function () {
          return copies.map(function (path) {
            return {
              src: files,
              dest: path + 'themes/<%= pkg.name %>-master/'
            }
          });
        })()
      }
    },
    watch: {
      options: {
        atBegin: true
      },
      styles: {
        files: 'styles/src/**/*.s*ss',
        tasks: 'sass autoprefixer cssmin'.split(' ')
      },
      js: {
        files: 'js/src/**/*.js',
        tasks: 'uglify'
      },
      copies: {
        files: files,
        tasks: defaultTasks
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', defaultTasks);
};