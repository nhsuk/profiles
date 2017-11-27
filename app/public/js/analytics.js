(function(global) {
  'use strict';
  var $ = global.jQuery;
  var hj = global.hj;

  var anchors = {
    'gp-email' : 'GP-Email',
    'gp-book-online' : 'GP-Booking',
    'gp-feedback-online' : 'GP-Leave-a-Review',
    'repeat-prescription-online' : 'GP-Repeat-Prescription',
    'coded-records-online' : 'GP-Medical-Record',
    'gp-ratings-reviews' : 'GP-Ratings-and-Reviews',
    'gp-patient-survey' : 'GP-Patient_Survey',
    'gp-website-register' : 'GP-Register_Patient',
    'gp-website-register-other' : 'GP-Register_Other',
    'gp-website' : 'GP-Websitet',
    'gp-website-opening-times' : 'GP-Website_OpeningTimes'
  }

  $.each(anchors , function(prop, val) {
    $('a.' + prop).on('touchstart click', function () {
      if (typeof hj === 'function') {
        hj('tagRecording', [val]);
      }
      // Webtrends is added asynchronously via DOM manipulation so must be accessed directly
      // rather than setting to a local variable as hj and jQuery are above
      if (global.Webtrends) {
        global.Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', val, 'WT.dl', '121']});
      }
    });
  });
})(window);
