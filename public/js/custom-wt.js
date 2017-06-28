jQuery(function($) {
  $(document).ready(function () {

    var anchors = {
      'gp-email' : 'GP-Email',
      'gp-book-online' : 'GP-Booking',
      'gp-feedback-online' : 'GP-Feedback',
      'repeat-prescription-online' : 'GP-Repeat-Prescription',
      'coded-records-online' : 'GP-Medical-Record',
      'gp-patient-survey' : 'GP-Patient_Survey',
      'gp-website-register' : 'GP-Register_Patient',
      'gp-website-register-other' : 'GP-Register_Other',
      'gp-ratings-reviews' : 'GP-Ratings_and_Reviews',
      'gp-website' : 'GP-Websitet',
      'gp-website-opening-times' : 'GP-Website_OpeningTimes'
    }

    $.each(anchors , function(prop, val) {
      $('a.' + prop).on('touchstart click', function () {
        Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', val, 'WT.dl', '121']});
      });
    });
  });
});
