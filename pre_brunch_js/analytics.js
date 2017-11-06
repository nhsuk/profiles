(function() {
  'use strict';

  var analytics = document.currentScript.getAttribute('data-analytics');
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
      if (analytics = 'all'){
        Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', val, 'WT.dl', '121']});
        hj('tagRecording', [val]);
      }
      else if (analytics = 'wt'){
        Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', val, 'WT.dl', '121']});
      }
      else if (analytics = 'hj'){
        hj('tagRecording', [val]);
      }
    });
  });
});
