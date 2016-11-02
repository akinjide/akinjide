var minifier = require('minifier'),
    ProgressBar = require('progress'),
    path = require('path'),
    jsIndex = [
      'scripts/lib/jquery.easytabs.min.js',
      'scripts/lib/respond.min.js',
      'scripts/lib/jquery.prettyPhoto.js',
      'scripts/lib/jquery.isotope.min.js',
      'scripts/lib/jquery-ui-map.js',
      'scripts/lib/jquery.carouFredSel.js',
      'scripts/lib/plugins.js',
      'scripts/lib/jquery.validate.min.js',
      'scripts/lib/js.cookie-2.1.2.min.js',
      'scripts/lib/clipboard.min.js',
      'scripts/lib/html2canvas.min.js',
      'scripts/lib/vfs_fonts.js',
      'scripts/lib/pdfmake.min.js',
      'scripts/script.js'
    ],
    jsError = [
      'scripts/lib/typed.min.js',
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
    bar, timer,
    destination = 'build/';

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

// Build .min.js
minifier.minify(jsIndex, { output: destination + '_6ltyr.min.js', noComments: true });
minifier.minify(jsError, { output: destination + '_6kgkb.min.js', noComments: true });

// Build .min.css
minifier.minify(cssIndex, { output: destination + '_oc2y0.min.css', noComments: true });
minifier.minify(cssError, { output: destination + '_tn2fu.min.css', noComments: true });