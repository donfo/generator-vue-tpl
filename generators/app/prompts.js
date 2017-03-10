var utils = require('../utils')
var path = require('path')

var needInstall = function (answers) {
  return answers.autoInstall;
}

module.exports = function (self) {
  return [
    {
      when: function () {
        return !(self.arguments && self.arguments[0] && self.arguments[0].length)
      },
      type: String,
      name: 'name',
      message: 'your project name',
      default: utils.makeProjectName(path.basename(process.cwd())),
      filter: utils.makeProjectName
    },
    {
      type: 'confirm',
      name: 'autoInstall',
      message: 'need auto install after generator?',
      default: false
    },
    {
      when: needInstall,
      type: 'confirm',
      name: 'yarnInstall',
      message: '> auto install with yarn?',
      default: true
    },
    {
      when: needInstall,
      type: 'confirm',
      name: 'npmInstall',
      message: '> auto install with npm?',
      default: true
    },
    {
      when: needInstall,
      type: 'confirm',
      name: 'bowerInstall',
      message: '> auto install with bower?',
      default: false
    }
  ]
}