jQuery(function($) {
  $(document).ready(function () {

    var anchors = {
      'gp-email' : 'Email',
      'gp-book-online' : 'Book Online',
      'repeat-prescription-online' : 'Repeat Prescriptions Online',
      'coded-records-online' : 'Medical Record Online',
      'gp-patient-survey' : 'Patient Survey',
      'gp-website' : 'Website',
      'gp-website-register' : 'How to register as a patient',
      'gp-website-register-other' : 'How to register with other surgeries',
      'gp-website-opening-times' : 'Website Opening Times'
    }

    $('a').on('touchstart click', function () {
      elem = $(this);
      $.each( anchors, function( key, value ){
        if ( $(elem).hasClass(key) ) {
          hj('tagRecording', [value]);
        }
      });
    });
  });
});
