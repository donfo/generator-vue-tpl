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
      default: self.savedProps.version
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
      default: self.savedProps.author
    },
    {
      type: 'checkbox',
      name: 'install',
      message: 'What install do you need:',
      choices: [
        {
          name: 'yarn',
          checked: true
        },
        {
          name: 'npm'
        },
        {
          name: 'bower'
        }
      ],
      default: self.savedProps.install
    }
  ]
}
