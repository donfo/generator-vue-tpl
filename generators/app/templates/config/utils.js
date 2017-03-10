var chalk = require('chalk')

module.exports.error = function (text) {
  return chalk.bold.white.bgRed('Error: ' + text)
}
