import { expect } from 'chai';
import moment from 'moment';

import Profile from './Profile';
import RULES from '../../constants/rules';

describe('Profile object', () => {
  it('should create valid Profile object with departure and arrival', () => {
    const params = {
      typeOfCover: 'singleTrip',
      typeOfPlan: 'family',
      region: 'asean',
      noOfAdult: '2',
      noOfChild: '2',
      departure: '01/04/2017',
      arrival: '01/08/2017'
    };

    const profile = new Profile(params);

    expect(typeof profile.noOfAdult).to.equal('number');
    expect(typeof profile.noOfChild).to.equal('number');
    expect(moment(profile.departure, RULES.DATE_FORMAT).isValid()).to.be.true;
    expect(moment(profile.arrival, RULES.DATE_FORMAT).isValid()).to.be.true;
    expect(profile.isValid()).to.be.true;
  });

  it('should create valid Profile object with startDate', () => {
    const params = {
      typeOfCover: 'multiTrip',
      typeOfPlan: 'family',
      region: 'asean',
      noOfAdult: '2',
      noOfChild: '2',
      startDate: '01/04/2017',
      endDate: '01/04/2018'
    };

    const profile = new Profile(params);

    expect(typeof profile.noOfAdult).to.equal('number');
    expect(typeof profile.noOfChild).to.equal('number');
    expect(moment(profile.startDate, RULES.DATE_FORMAT).isValid()).to.be.true;
    expect(profile.isValid()).to.be.true;
  });

  it('should create Profile object without adult', () => {
    const params = {
      typeOfCover: 'singleTrip',
      typeOfPlan: 'family',
      region: 'asean',
      noOfChild: '2',
      departure: '01/04/2017',
      arrival: '01/08/2017'
    };

    const profile = new Profile(params);

    expect(profile.isValid()).to.be.false;
  });
});
