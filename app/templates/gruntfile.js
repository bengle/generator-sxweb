
module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // buildBase: 'build',
        // srcBase: 'src',
        // packageName: 'page',
        // pageName: options.pageName,
        // pageSrcBase: '<%= srcBase %>/pages/<%= pageName %>/<%= packageName %>',
        // commonSrcBase: '<%= srcBase %>/common',
        // pageBuildBase: '<%= buildBase %>/pages/<%= pageName %>/<%= packageName %>',
        // commonBuildBase: '<%= buildBase %>',
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
            // page: {
            //     src: function(){
            //         var oArr = [];
            //         for(page in pkg.pages){
            //             oArr.push('src/pages/'+page+'/*.js');
            //         }
            //         return oArr;
            //     },
            //     dest: function(){
            //         var oArr = [];
            //         for(page in pkg.pages){
            //             oArr.push('build/pages/'+page+'/index.js');
            //         }
            //         return oArr;
            //     }
            // }
            page: {
                src: ['src/pages/<%= grunt.config.get("page") %>/*.js'],
                dest: 'build/pages/<%= grunt.config.get("page") %>/index.js'
            }
        },
        css_combo: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            page: {
                src: 'src/pages/<%= grunt.config.get("page") %>/index.css',
                dest: 'build/pages/<%= grunt.config.get("page") %>/index.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            page: {
                files: {
                    'build/pages/<%= grunt.config.get("page") %>/index.min.js': ['<%= concat.page.dest %>']
                }
            }
        },
        cssmin: {
            page: {
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
    
    //grunt.registerTask('build',['jshint','copy:common','concat:page','css_combo:page','uglify:page','cssmin:page']);
    grunt.registerTask('build',function(pageName){
        if(pageName == 'common'){
            grunt.task.run(['jshint','copy:common']);
        }else{
            grunt.config.set('page',pageName);
            grunt.task.run(['jshint','copy:common','concat:page','css_combo:page','uglify:page','cssmin:page']);
        } 
    });
    // var pkg = grunt.file.readJSON('package.json');
    // var pageNames = pkg.pages;
    // var taskArr = [];
    // for(page in pkg.pages){
    //     grunt.registerTask('build',function(){
    //         grunt.config.set('page',pkg.pages[page]);
    //         console.log(grunt.config.get("page"));
    //         grunt.task.run(['jshint','copy:common','concat:page','css_combo:page','uglify:page','cssmin:page']);
    //     });
    //     taskArr.push('task'+page);
    // }
    // grunt.registerTask('default', taskArr);
}