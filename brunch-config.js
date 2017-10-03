module.exports = {
  paths: {
    watched: ['scss-c2s']
  },
  files: {
    stylesheets: {
      joinTo: {
        'nhsuk.css': /c2s.scss/,
        'nhsuk-ie6.css': /c2s-ie6.scss/,
        'nhsuk-ie7.css': /c2s-ie7.scss/,
        'nhsuk-ie8.css': /c2s-ie8.scss/,
        'print.css': /c2s-print.scss/
      },
    }
  },
  plugins: {
    sass: {
      options: {
        includePaths: ['scss-0.5.1']
      }
    }
  }
};
