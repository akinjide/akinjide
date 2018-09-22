var fs = require('fs')
var log = require('lib-log')

// 'build/' + filename,
module.exports = function toDisk(destination, filename, fn, locals, callback) {
  fs.writeFile(destination + filename, fn(locals), function(err, result) {
    if (err) return callback(err)

    log('*.html file saved')
    callback(null, result)
  })
}
