jQuery(function($) {
  $(document).ready(function () {

    var anchors = {
      'gp-email' : 'GP-Email',
      'gp-book-online' : 'GP-Booking',
      'repeat-prescription-online' : 'GP-Repeat-Prescription',
      'coded-records-online' : 'GP-Medical-Record',
      'gp-patient-survey' : 'GP-Patient_Survey',
      'gp-website-register' : 'GP-Register_Patient',
      'gp-website-register-other' : 'GP-Register_Other',
      'gp-website' : 'GP-Websitet',
      'gp-website-opening-times' : 'GP-Website_OpeningTimes'
    }

    $('a').on('touchstart click', function () {
      elem = $(this);
      $.each( anchors, function( key, value ){
        if ( $(elem).hasClass(key) ) {
          Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', value, 'WT.dl', '121']});
        }
      });
    });
  });
});
