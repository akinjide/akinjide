var fs = require('fs')
var log = require('lib-log')

module.exports = function toDisk(filename, payload, callback) {
  fs.writeFile(filename, payload, function(err, result) {
    if (err) return callback(err)

    log('*.yml file has been saved')
    callback(null, result)
  })
}
