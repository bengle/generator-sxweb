module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['src/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            jsdist: {
                src: ['src/pages/<%= pkg.pages %>/*.js'],
                dest: 'build/pages/<%= pkg.pages %>/index.js'
            },
            cssdist: {
                src: ['src/pages/<%= pkg.pages %>/*.css'],
                dest: 'build/pages/<%= pkg.pages %>/index.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'build/pages/<%= pkg.pages %>/index.min.js': ['<%= concat.jsdist.dest %>']
                }
            }
        },
        cssmin: {
            minify: {
                expand:true,
                cwd:'build/pages/<%= pkg.pages %>/',
                src:'index.css',
                dest:'build/pages/<%= pkg.pages %>/',
                ext:'.min.css'
            }
        }
    });

    /**
     * 载入使用到的通过NPM安装的模块
     */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /**
     * 注册基本任务
     */
    grunt.registerTask('default', [ 'all' ]);
    grunt.registerTask('build',['jshint','concat','uglify','cssmin']);
}