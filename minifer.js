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
    destination = 'build/',
    environment = process.argv[2] || 'development';

minifier.on('error', function(e) {
  console.log('>>> minifier error', e);
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

// Build .min.css
minifier.minify(cssIndex, { output: destination + '_oc2y0.min.css', noComments: true });
minifier.minify(cssError, { output: destination + '_tn2fu.min.css', noComments: true });


// Build .min.js
if (environment === 'development') {
  // development
  console.log('using >>>development');
  var options = {
    noComments: true,
    uglify: {
      output: {
        beautify: true,
        indent_level: 2,
        width: 100,
        comments: true
      },
      compressor: {}
    },
  };

  minifier.minify(jsIndex, Object.assign({
    output: destination + '_6ltyr.dev.js'
  }, options));

  minifier.minify(jsError, Object.assign({
    output: destination + '_6kgkb.dev.js'
  }, options));
} else if (environment === 'production') {
  // Production
  console.log('using >>>production');
  minifier.minify(jsIndex, { output: destination + '_6ltyr.min.js', noComments: true });
  minifier.minify(jsError, { output: destination + '_6kgkb.min.js', noComments: true });
} else {
  console.log('>>> minifier error, Please specify an environment.');
  process.exit(1);
}