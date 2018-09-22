var bsConfig = require('./bs-config')
var log = require('lib-log')

module.exports = function server(sync) {
  sync.init(bsConfig, function(err, syncs) {
    if (syncs.active) {
      sync.notify('-- listening ' + bsConfig.ui.port, 2000)
      log('serving *.*')
    }
  })
}
