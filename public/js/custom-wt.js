jQuery(function($) {
  $(document).ready(function () {
    $('.gp-email').on('touchstart click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Email', 'WT.dl', '121']});
    });
    $('.gp-book-online').on('touchstart click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Booking', 'WT.dl', '121']});
    });
    $('.repeat-prescription-online').on('touchstart click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Repeat-Prescription', 'WT.dl', '121']});
    });
    $('.coded-records-online').on('touchstart click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Medical-Record', 'WT.dl', '121']});
    });
    $('.gp-patient-survey').on('touchstart click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Patient_Survey', 'WT.dl', '121']});
    });
    $('.gp-website-register').on('touchstart click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Register_Patient', 'WT.dl', '121']});
    });
    $('.gp-website-register-other').on('touchstart click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Register_Other', 'WT.dl', '121']});
    });
    $('.gp-website').on('touchstart click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Website', 'WT.dl', '121']});
    });
    $('.gp-website-opening-times').on('touchstart click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Website_OpeningTimes', 'WT.dl', '121']});
    });
  });
});
