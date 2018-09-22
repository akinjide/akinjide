var yaml = require('js-yaml')

module.exports = function dump(payload) {
  return yaml.safeDump(payload, { 'sortKeys' : true })
}
