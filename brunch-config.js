module.exports = {
  paths: {
    watched: ['scss-c2s', 'pre_brunch_js']
  },
  conventions: {
    ignored: 'scss-c2s/c2s-ie.scss'
  },
  overrides: {
    development: {
      sourceMaps: true,
    },
    production: {
      sourceMaps: false,
      plugins: {
        afterBrunch: [
          'sleep 1s && yarn map-replace app/views/layout.nunjucks < assets.json && yarn map-replace app/views/includes/analytics.nunjucks < assets.json'
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
        'js/customga.js': /customga.js/,
        'js/analytics.js': /analytics.js/,
        'js/cookiemessage.js': /cookiemessage.js/,
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
        includePaths: ['scss-0.5.1']
      }
    },
    fingerprint: {
      srcBasePath: 'public/',
      destBasePath: 'public/',
      autoClearOldFiles: true
    }
  }
};
