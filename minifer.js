var minifier = require('minifier'),
    ProgressBar = require('progress'),
    path = require('path'),
    jsIndex = [
      'scripts/jquery.easytabs.min.js',
      'scripts/respond.min.js',
      'scripts/jquery.prettyPhoto.js',
      'scripts/jquery.isotope.min.js',
      'scripts/jquery-ui-map.js',
      'scripts/jquery.carouFredSel.js',
      'scripts/plugins.js',
      'scripts/jquery.validate.min.js',
      'scripts/js.cookie-2.1.2.min.js',
      'scripts/clipboard.min.js',
      'scripts/html2canvas.min.js',
      'scripts/vfs_fonts.js',
      'scripts/pdfmake.min.js',
      'scripts/script.js'
    ],
    jsError = [
      'scripts/typed.min.js',
      'scripts/404.js'
    ],
    cssIndex = [
      'styles/reset.css',
      'styles/style.css',
      'styles/prettyPhoto.css'
    ],
    cssError = [
      'styles/404.css'
    ],
    len = jsIndex.length + cssIndex.length + cssError.length + jsError.length,
    bar, timer;

minifier.on('error', function(e) {
  console.log('>>> minifier error', e)
  process.exit(1);
});

bar = new ProgressBar('minifing [:bar] :percent :etas :current/:total', {
  complete: '█',
  incomplete: '░',
  width: 100,
  total: len
});

timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('\n  >>> Minification complete\n');
    clearInterval(timer);
  }
}, 100);

// Build js
minifier.minify(jsIndex, { output: 'dist/_6ltyr.min.js', noComments: true});
minifier.minify(jsError, { output: 'dist/_6kgkb.min.js', noComments: true});

// Build css
minifier.minify(cssIndex, { output: 'dist/_oc2y0.min.css', noComments: true});
minifier.minify(cssError, { output: 'dist/_tn2fu.min.css', noComments: true});