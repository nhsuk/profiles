(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("public/js/customga.js", function(exports, require, module) {
jQuery(function($) {

  // Debug flag
  var debugMode = false;

  // Default time delay before checking location
  var callBackTime = 100;

  // # px before tracking a reader
  var readerLocation = 150;

  // Set some flags for tracking & execution
  var timer = 0;
  var scroller = false;
  var didComplete = false;

  var endTimer;
  var sectionTitle;

  // Set some time variables to calculate reading time
  var startTime = new Date();
  var beginning = startTime.getTime();
  var totalTime = 0;

  // Get some information about the current page
  var pageTitle = document.title;

  function scrolledSection(start, section) {
    currentTime = new Date();
    if (start) {
      scrollStart = currentTime.getTime();
      timeToScroll = Math.round((scrollStart - beginning) / 1000);
      if (!debugMode) {
          ga('send', 'event', section, timeToScroll+'s');
      } else {
          alert(section + ' (Time: ' + timeToScroll + 's)');
      }

    } else {
      scrollEnd = currentTime.getTime();
      timeToScroll = Math.round((scrollEnd - scrollStart) / 1000);
      if (!debugMode) {
          ga('send', 'event', 'User reached the "' + section +'" section', timeToScroll+'s');
      } else {
          alert('User reached the "' + section + '" section (Time: ' + timeToScroll + 's)');
      }
    }
    scroller = true;
  }

  function aboveFold(bottom, element){
    var point = $(element);
    return bottom > point.offset().top + point.outerHeight();
  }

  // Check the location and track user
  function trackLocation() {
      bottom = $(window).height() + $(window).scrollTop();
      height = $(document).height();

      // If user starts to scroll send an event
      if (bottom > readerLocation && !scroller) {
        scrolledSection(true, 'User started scrolling');
        scroller = true;
      }

      $('h2, .exceptional-opening-times').not('.above, .util-visuallyhidden').each(function(){
        if(aboveFold(bottom, $(this))){
          $(this).addClass('above');
          scrolledSection(false, $(this).data('title'));
        }
      });

      if (bottom > $('footer ul.link-list').offset().top + $('footer ul.link-list').outerHeight() && !didComplete){
        scrolledSection(false, 'end of the page');
        didComplete = true;
      }
  }

  // Track the scrolling and track location
  $(window).scroll(function() {
      if (timer) {
          clearTimeout(timer);
      }

      // Use a buffer so we don't call trackLocation too often.
      timer = setTimeout(trackLocation, callBackTime);
  });

});

});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=customga.js.map