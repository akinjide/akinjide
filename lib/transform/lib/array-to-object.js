var log = require('lib-log')

module.exports = function transform(data) {
  log('transforming parsed *.yml')

  return data.reduce(function(col, datum, i) {
    return Object.assign(col, datum)
  }, {})
}
