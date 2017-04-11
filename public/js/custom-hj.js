jQuery(function($) {
  $(document).ready(function () {
    $('.gp-email').on('click', function () {
      hj('tagRecording', ['Email']);
    });
    $('.gp-book-online').on('click', function () {
      hj('tagRecording', ['Book Online']);
    });
    $('.gp-patient-survey').on('click', function () {
      hj('tagRecording', ['Patient Survey']);
    });
    $('.gp-website').on('click', function () {
      hj('tagRecording', ['Website']);
    });
    $('.gp-website-opening-times').on('click', function () {
      hj('tagRecording', ['Website Opening Times']);
    });
  });
});
