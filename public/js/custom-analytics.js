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
  var endOpeningTimes = false;
  var endPatientsSay = false;
  var endSurgeryGPs = false;
  var endServices = false;
  var endParking = false;
  var didComplete = false;

  // Set some time variables to calculate reading time
  var startTime = new Date();
  var beginning = startTime.getTime();
  var totalTime = 0;

  // Get some information about the current page
  var pageTitle = document.title;

  // Track the aticle load
  if (!debugMode) {
      //ga('send', 'event', 'Reading', 'ArticleLoaded', '');

  } else {
      console.log('Start custom analytics');
  }

  // Check the location and track user
  function trackLocation() {
      bottom = $(window).height() + $(window).scrollTop();
      height = $(document).height();
      results = $('.reading-width .sr-only').attr('data-results');
      results_14 = Math.round(results / 4);
      results_12 = Math.round(results / 2);
      results_34 = Math.round(results_14 * 3);


      // If user starts to scroll send an event
      if (bottom > readerLocation && !scroller) {
          currentTime = new Date();
          scrollStart = currentTime.getTime();
          timeToScroll = Math.round((scrollStart - beginning) / 1000);
          if (!debugMode) {
              console.log('started reading ' + timeToScroll);
              ga('send', 'event', 'User started scrolling', timeToScroll+'s');
          } else {
              alert('User started scrolling (Time: ' + timeToScroll + 's)');
          }
          scroller = true;
      }

      if (bottom > $('h2.opening-times:contains("GP")').offset().top + $('h2.opening-times:contains("GP")').outerHeight() && !endOpeningTimes) {
          currentTime = new Date();
          openingTimesScrollEnd = currentTime.getTime();
          timeToOpeningTimesEnd = Math.round((openingTimesScrollEnd - scrollStart) / 1000);
          if (!debugMode) {
              ga('send', 'event', 'User reached the "GP Opening Times" section', timeToOpeningTimesEnd+'s');
          } else {
              alert('User reached the "GP Opening Times" section (Time: ' + timeToOpeningTimesEnd + 's)');
          }
          endOpeningTimes = true;
      }

      if (bottom > $('h2:contains("What patients say about this surgery")').offset().top + $('h2:contains("What patients say about this surgery")').outerHeight() && !endPatientsSay) {
          currentTime = new Date();
          patientsSayScrollEnd = currentTime.getTime();
          timeToPatientsSayEnd = Math.round((patientsSayScrollEnd - scrollStart) / 1000);
          if (!debugMode) {
              ga('send', 'event', 'User reached the "What patients say about this surgery" section', timeToPatientsSayEnd+'s');
          } else {
              alert('User reached the "What patients say about this surgery" section (Time: ' + timeToPatientsSayEnd + 's)');
          }
          endPatientsSay = true;
      }

      if (bottom > $('h2:contains("GPs at this surgery")').offset().top + $('h2:contains("GPs at this surgery")').outerHeight() && !endSurgeryGPs) {
          currentTime = new Date();
          surgeryGPsScrollEnd = currentTime.getTime();
          timeToSurgeryGPsEnd = Math.round((surgeryGPsScrollEnd - scrollStart) / 1000);
          if (!debugMode) {
              ga('send', 'event', 'User reached the "GPs at this surgery" section', timeToSurgeryGPsEnd+'s');
          } else {
              alert('User reached the "GPs at this surgery" section (Time: ' + timeToSurgeryGPsEnd + 's)');
          }
          endSurgeryGPs = true;
      }

      if (bottom > $('h2:contains("Services at this surgery")').offset().top + $('h2:contains("Services at this surgery")').outerHeight() && !endServices) {
          currentTime = new Date();
          servicesScrollEnd = currentTime.getTime();
          timeToServicesEnd = Math.round((servicesScrollEnd - scrollStart) / 1000);
          if (!debugMode) {
              ga('send', 'event', 'User reached the "Services at this surgery" section', timeToServicesEnd+'s');
          } else {
              alert('User reached the "Services at this surgery" section (Time: ' + timeToServicesEnd + 's)');
          }
          endServices = true;
      }

      if (bottom > $('h2:contains("Parking")').offset().top + $('h2:contains("Parking")').outerHeight() && !endParking) {
          currentTime = new Date();
          parkingScrollEnd = currentTime.getTime();
          timeToParkingEnd = Math.round((parkingScrollEnd - scrollStart) / 1000);
          if (!debugMode) {
              ga('send', 'event', 'User reached the "Parking and accessibility" section', timeToParkingEnd+'s');
          } else {
              alert('User reached the "Parking and accessibility" section (Time: ' + timeToParkingEnd + 's)');
          }
          endParking = true;
      }

      if (bottom > $('footer ul.link-list').offset().top + $('footer ul.link-list').outerHeight() && !didComplete) {
          currentTime = new Date();
          end = currentTime.getTime();
          totalTime = Math.round((end - scrollStart) / 1000);
          if (!debugMode) {
              if (totalTime < 20) {
                  _gaq.push(['_setCustomVar', 5, 'ReaderType', 'Scanner', 2]);
              } else {
                  _gaq.push(['_setCustomVar', 5, 'ReaderType', 'Reader', 2]);
              }
              ga('send', 'event', 'User reached the end of the page', totalTime+'s');
          } else {
              alert('User reached the end of the page (Time: ' + totalTime + 's)');
          }
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
