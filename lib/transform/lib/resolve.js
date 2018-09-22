var path = require('path')

module.exports = function resolve(cwd, dir) {
  return path.join(cwd, '..', dir)
}
