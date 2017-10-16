const chai = require('chai');
const choicesLinks = require('../../app/lib/choicesLinks');

const expect = chai.expect;

describe('choicesLinks', () => {
  it('should return populated links', () => {
    const links = choicesLinks({ choicesId: '12345', odsCode: 'AB56789' });

    expect(links.choicesLogin).to.equal('https://www.nhs.uk/Personalisation/Login.aspx?ReturnUrl=/Services/GP/Overview/DefaultView.aspx?id=12345');
    expect(links.choicesReviews).to.equal('https://www.nhs.uk/Services/GP/ReviewsAndRatings/DefaultView.aspx?id=12345');
    expect(links.choicesLeaveReview).to.equal('https://www.nhs.uk/Services/GP/LeaveReview/DefaultView.aspx?id=12345');
    expect(links.choicesProfile).to.equal('https://www.nhs.uk/Services/GP/Overview/DefaultView.aspx?id=12345');
    expect(links.patientSurvey).to.equal('https://gp-patient.co.uk/report?practicecode=AB56789');
  });
});
