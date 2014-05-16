//引入依赖模块，不了解的先看看Nodejs基础吧
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SxwebGenerator = module.exports = function SxwebGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });//读取命令中是否有--skip-install，如果有则在项目构建完毕后不自动安装依赖模块，用法：yo test2 --skip-install
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SxwebGenerator, yeoman.generators.Base);

SxwebGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
//定义在命令执行时的输出提问信息，该信息你爱怎么用怎么用，比如提问要生成的项目名是什么，然后可以自动写入配置中之类的操作
  var prompts = [{
    type: 'confirm',
    name: 'beginning',
    message: 'start your trail?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.beginning = props.beginning;

    cb();//执行async，开始真正的工作，假设你不需要用户输入信息，可以把prompt去掉，但一定要执行cb，不然程序就不会有任何操作
  }.bind(this));
};

SxwebGenerator.prototype.app = function app() {
  this.mkdir('src');//在目标文件夹创建app目录，这里的目标文件夹是指你要初始化的项目目录
  this.mkdir('src/pages');//在目标文件夹app下创建templates目录
  this.mkdir('build');
  this.mkdir('build/common');
  this.mkdir('build/pages');
  this.mkdir('common');

  this.copy('_package.json', 'package.json');//将_package.json复制到目标文件夹下，并重命名为package.json
  this.copy('_bower.json', 'bower.json');
};

SxwebGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');//操作与上面的一样，都会被执行，位置可以任意放
  this.copy('jshintrc', '.jshintrc');
  this.copy('gruntfile.js','gruntfile.js');
};