var fs = require('fs')
var path = require('path')
var libPath = path.join(__dirname, "lib")

module.exports = Array.prototype.reduce.call(fs.readdirSync(libPath), function(paths, file) {
  var libModule = path.join(libPath, file)
  var regex = /-|\.js/g
  var key = file.replace(regex, '')

  paths[key] = require(libModule)
  return paths
}, {})
