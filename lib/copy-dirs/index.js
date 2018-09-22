var copy = require('copy')
var log = require('lib-log')

module.exports = function copyDirs(source, destination, callback) {
  copy(source, destination, function(err, done) {
    if (err) return callback(err)

    log(source + ' copied')
    callback(null, done)
  })
}
