module.exports = {
  paths: {
    watched: ['scss-c2s', 'app/public/js']
  },
  conventions: {
    ignored: ['scss-c2s/c2s-ie.scss']
  },
  overrides: {
    development: {
      sourceMaps: true,
    },
    production: {
      sourceMaps: false,
      plugins: {
        afterBrunch: [
          // eslint-disable-next-line no-template-curly-in-string
          'sleep 1s; for file in public/js/*.js; do ./node_modules/uglify-es/bin/uglifyjs $file -m -c > ${file}.ugly; mv ${file}.ugly $file; done',
          'sleep 1s; for file in app/views/*.nunjucks; do yarn map-replace $file < assets.json; done',
          'sleep 1s; for file in app/views/includes/*.nunjucks; do yarn map-replace $file < assets.json; done',
        ]
      }
    }
  },
  npm: {
    enabled: false
  },
  modules: {
    wrapper: false,
    definition: false
  },
  files: {
    javascripts: {
      joinTo: {
        'js/app.js': ['app/public/js/analytics.js', 'app/public/js/cookieMessage.js'],
        'js/GA.js': 'app/public/js/GA.js',
      }
    },
    stylesheets: {
      joinTo: {
        'nhsuk.css': /c2s.scss/,
        'nhsukie6.css': /c2s-ie6.scss/,
        'nhsukie7.css': /c2s-ie7.scss/,
        'nhsukie8.css': /c2s-ie8.scss/,
        'print.css': /c2s-print.scss/
      },
    }
  },
  plugins: {
    sass: {
      options: {
        includePaths: ['scss-0.7.1']
      }
    },
    fingerprint: {
      srcBasePath: 'public/',
      destBasePath: 'public/',
      autoClearOldFiles: true
    }
  }
};
