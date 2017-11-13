(function(global) {
  'use strict';
  var $ = global.jQuery;
  var document = global.document;
  var window = global;

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
    var scrollStart, scrollEnd, timeToScroll;
    var currentTime = new Date();

    if (start) {
      scrollStart = currentTime.getTime();
      timeToScroll = Math.round((scrollStart - beginning) / 1000);
      ga('send', 'event', section, timeToScroll+'s');
    } else {
      scrollEnd = currentTime.getTime();
      timeToScroll = Math.round((scrollEnd - scrollStart) / 1000);
      ga('send', 'event', 'User reached the "' + section +'" section', timeToScroll+'s');
    }
    scroller = true;
  }

  function aboveFold(bottom, element){
    var point = $(element);
    return bottom > point.offset().top + point.outerHeight();
  }

  // Check the location and track user
  function trackLocation() {
      var bottom = $(window).height() + $(window).scrollTop();
      var height = $(document).height();

      // If user starts to scroll send an event
      if (bottom > readerLocation && !scroller) {
        scrolledSection(true, 'User started scrolling');
        scroller = true;
      }

      $('h2, .exceptional-opening-times').not('.above, .util-visuallyhidden').each(function() {
        if(aboveFold(bottom, $(this))){
          $(this).addClass('above');
          scrolledSection(false, $(this).data('title'));
        }
      });

      if (bottom > $('footer ul.link-list').offset().top + $('footer ul.link-list').outerHeight() && !didComplete) {
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

})(window);
