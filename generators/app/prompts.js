const utils = require('../utils')
const path = require('path')

module.exports = self => {
  return [
    {
      when: () => {
        return !self.options.name
      },
      type: String,
      name: 'name',
      message: 'your project name',
      default: 'new-project'
    },
    {
      type: 'input',
      name: 'version',
      message: 'Project version:',
      default: '1.0.0'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description:',
      default: 'A Vue.js project'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author name:',
      default: ''
    },
    {
      type: 'list',
      name: 'install',
      message: 'What install do you need:',
      choices: ['yarn', 'npm', 'bower', 'Don\'t need to be installed automatically'],
      default: 0
    }
  ]
}
