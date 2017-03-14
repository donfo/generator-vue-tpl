const _ = require('lodash')

exports.makeProjectName = function (name) {
  return _.kebabCase(name)
}
