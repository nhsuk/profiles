jQuery(function($) {
  $(document).ready(function () {
    $('.gp-email').on('click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Email', 'WT.dl', '121']});
    });
    $('.gp-book-online').on('click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Booking', 'WT.dl', '121']});
    });
    $('.repeat-prescription-online').on('click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Repeat-Prescription', 'WT.dl', '121']});
    });
    $('.coded-records-online').on('click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Medical-Record', 'WT.dl', '121']});
    });
    $('.gp-patient-survey').on('click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Patient_Survey', 'WT.dl', '121']});
    });
    $('.gp-website').on('click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Website', 'WT.dl', '121']});
    });
    $('.gp-website-opening-times').on('click', function () {
      Webtrends.multiTrack({argsa: ['DCSext.CTSLinkClicks', 'GP-Website_OpeningTimes', 'WT.dl', '121']});
    });
  });
});
