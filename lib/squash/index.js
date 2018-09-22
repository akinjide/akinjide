var log = require('lib-log')
var COMB = (
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuwxyz' +
  '1234567890' +
  '_-'
).split('')

module.exports = function squash(length) {
  var iterator = 0
  var result = []

  for (iterator; iterator < length; iterator++) {
    result.push(COMB[Math.floor(Math.random() * COMB.length - iterator) + iterator])
  }

  log('generated ' + result)
  return result.join('')
}
