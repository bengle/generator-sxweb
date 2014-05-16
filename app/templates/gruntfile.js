module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>-<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */\n',
        beautify: {
          ascii_only: true
        },
        compress: {
          global_defs: {
            'DEBUG': false
          },
          dead_code: true
        }
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['src/**/*.js'],
      options: {
        // read jshint options from jshintrc file 
        "jshintrc": ".jshintrc"
      }
    },
    cssmin: {
      build: {
        files: {
          'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css': [ 'src/css/*.css' ]
        }
      }
    },
    copy: {
      css: {
        cwd: 'src/css',
        src: [ '*.css' ],
        dest: 'dist/css',
        expand: true
      }
    },
    watch: {
      coffee: {
        files: ['src/js/**/*.coffee'],
        tasks: ['coffee']
      },
      scripts: {
        files: ['src/js/*.js', 'src/css/*.css'],
        tasks: ['build']
      }
    },
    coffee: {
      compile: {
        options: {
          sourceMap: false
        },
        expand: true,
        cwd: 'src/js/coffee',
        src: ['*.coffee'],
        dest: 'src/js',
        ext: '.coffee.js'
      }
    },
    clean:{
      spm : {
        src: [ '**/.gitignore','**/.npmignore']
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        options: {
          paths: 'src/js',
          outdir: 'doc'
        }
      }
    }
  });

  grunt.registerTask('build', ['test','coffee','concat','uglify','cssmin','copy','yuidoc']);

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['build', 'watch']);
};