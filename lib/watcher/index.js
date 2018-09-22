var gaze = require('gaze')
var moment = require('moment')
var log = require('lib-log')

module.exports = function watcher(paths, sync, serve, build) {
  gaze(paths, function(err, watcher) {
    log('watching %s directories', Object.keys(this.watched()).length)

    log(this.watched())

    this.on('all', function(event, filepath) {
      log(event, filepath)

      build(isDevelopment, function(err, done) {
        log('Regenerated site %s [%s]', done, moment())

        if (serve) {
          sync.reload()
        }

        console.timeEnd('-- compileTime')
      })
    })
  })
}
