var page = null;
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
        copy: {
            common: {
                src: ['common/*'],
                dest: 'build/',
                filter: 'isFile'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            jsdist: {
                src: ['src/pages/<%= grunt.config.get("page") %>/*.js'],
                dest: 'build/pages/<%= grunt.config.get("page") %>/index.js'
            }
        },
        css_combo: {
            files: {
                src: 'src/pages/<%= grunt.config.get("page") %>/index.css',
                dest: 'build/pages/<%= grunt.config.get("page") %>/index.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'build/pages/<%= grunt.config.get("page") %>/index.min.js': ['<%= concat.jsdist.dest %>']
                }
            }
        },
        cssmin: {
            minify: {
                expand:true,
                cwd:'build/pages/<%= grunt.config.get("page") %>/',
                src:'index.css',
                dest:'build/pages/<%= grunt.config.get("page") %>/',
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
    //grunt.registerTask('build',['jshint','copy','concat','css_combo','uglify','cssmin']);
    grunt.registerTask('build',function(){
        var pkg = grunt.file.readJSON('package.json');
        //console.log(pkg.pages);
        for(page in pkg.pages){
            grunt.config.set('page',pkg.pages[page]);
            console.log(grunt.config.get("page"));
            grunt.task.run(['jshint','copy','concat','css_combo','uglify','cssmin']);
            //grunt.task.run('jshint');
            //grunt.task.run('copy');
            //grunt.task.run('concat');
            //grunt.task.run('css_combo');
            //grunt.task.run('uglify');
            //grunt.task.run('cssmin');
        }
    });
}