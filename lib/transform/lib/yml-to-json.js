var path = require('path')
var yaml = require('js-yaml')
var read = require('./read')
var log = require('lib-log')

module.exports = function parse(GLOBAL, files, dir) {
  return files.map(function(file) {
    log('parsing ', files.name)

    try {
      if (file.isTemplate) {
        return yaml.safeLoad(
          read(path.join(GLOBAL.root, '/config/'), file.name)
        )
      }

      return yaml.safeLoad(
        read(path.join(dir, '..', 'config/'), file.name)
      )
    } catch (err) {
      throw err
    }
  })
}
