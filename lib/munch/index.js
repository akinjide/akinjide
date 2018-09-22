module.exports = function munch(pkgs, paths, filename, options) {
  var payload = {
    output: 'build/' + filename,
    noComments: true
  }

  if (options && Object.keys(options).length) Object.assign(payload, options)
  pkgs.minifier.minify(paths, payload)
}
