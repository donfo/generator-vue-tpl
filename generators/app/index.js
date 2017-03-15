'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const mkdirp = require('mkdirp')

const optionsConfig = require('./options')
const promptsConfig = require('./prompts')

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
    this.argument('name', {
      type: String,
      desc: 'your project name',
      default: ''
    })
    optionsConfig.map(option => {
      this.option(option.name, option.def)
    })
  }

  initializing () {
    this.props = this.config.get('props')
  }

  prompting () {
    this.log(yosay(
      'Welcome to the fantabulous ' + chalk.red('generator-vue-tpl') + ' generator!'
    ))
    const prompts = promptsConfig(this)
    return this.prompt(prompts).then(answers => {
      this.props = answers
      this.props.name = answers.name ? answers.name : this.options.name
    })
  }

  configuring () {
    this.config.set('props', this.props)
    this.config.save()
  }

  default () {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      )
      mkdirp(this.props.name)
      this.destinationRoot(this.destinationPath(this.props.name))
    }
  }

  writing () {
    this._copy('build/**', 'build')
    this._copy('config/**', 'config')
    this._copy('src/**', 'src')
    this._copy('static/**', 'static')
    this._copy('test/**', 'test')
    this._copyTpl('.babelrc', '.babelrc')
    this._copyTpl('.editorconfig', '.editorconfig')
    this._copyTpl('.eslintignore', '.eslintignore')
    this._copyTpl('.eslintrc.js', '.eslintrc.js')
    this._copyTpl('.gitignore', '.gitignore')
    this._copyTpl('.npmignore', '.npmignore')
    this._copyTpl('.postcssrc.js', '.postcssrc.js')
    this._copyTpl('_package.json', 'package.json')
    this._copyTpl('env.example.js', 'env.example.js')
    this._copy('index.html', 'index.html')
    this._copyTpl('README.md', 'README.md')
  }

  install () {
    if (this.props.install && this.props.install.length) {
      this.installDependencies({
        yarn: this.props.install.indexOf('yarn') !== -1,
        npm: this.props.install.indexOf('npm') !== -1,
        bower: this.props.install.indexOf('bower') !== -1
      })
    }
  }

  end () {
    this.log(chalk.white.bgRed.bold(' Warn ') + ' ' + chalk.green.bold('Please copy env.example.js as env.js'))
  }

  _copy (from, to) {
    this.fs.copy(
      this.templatePath(from),
      this.destinationPath(to),
      {
        globOptions: { dot: true }
      }
    )
  }

  _copyTpl (from, to) {
    this.fs.copyTpl(
      this.templatePath(from),
      this.destinationPath(to),
      this,
      {
        globOptions: { dot: true }
      }
    )
  }

}
