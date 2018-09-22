var fs = require('fs')
var log = require('lib-log')

module.exports = function read(dir, file) {
  log('reading ', file)

  return fs.readFileSync(dir + file, {
    encoding: 'utf8',
    flag: 'r'
  })
}
