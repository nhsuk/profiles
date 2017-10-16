const choicesUrl = require('../../config/config').choicesUrl;

function getChoicesLoginLink(choicesId) {
  return `${choicesUrl}/Personalisation/Login.aspx?ReturnUrl=/Services/GP/Overview/DefaultView.aspx?id=${choicesId}`;
}

function getChoicesProfileLink(choicesId) {
  return `${choicesUrl}/Services/GP/Overview/DefaultView.aspx?id=${choicesId}`;
}

function getChoicesLeaveReviewLink(choicesId) {
  return `${choicesUrl}/Services/GP/LeaveReview/DefaultView.aspx?id=${choicesId}`;
}

function getChoicesReviewsLink(choicesId) {
  return `${choicesUrl}/Services/GP/ReviewsAndRatings/DefaultView.aspx?id=${choicesId}`;
}

function getPatientSurveyLink(odsCode) {
  return `https://gp-patient.co.uk/report?practicecode=${odsCode}`;
}

module.exports = gpData => ({
  choicesLogin: getChoicesLoginLink(gpData.choicesId),
  choicesProfile: getChoicesProfileLink(gpData.choicesId),
  choicesReviews: getChoicesReviewsLink(gpData.choicesId),
  choicesLeaveReview: getChoicesLeaveReviewLink(gpData.choicesId),
  patientSurvey: getPatientSurveyLink(gpData.odsCode)
});
