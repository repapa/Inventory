import { expect } from 'chai';
import validateTraveller from './travellerValidator';

describe('travellerValidator', () => {
  it('should create error if fields are empty', () => {
    const input = {
      firstName: ''
    };

    const expectedErrors = {
      firstName: 'Value Required!',
      lastName: 'Value Required!',
      dateOfBirth: 'Please select date!',
      gender: 'Value Required!',
      nationality: 'Value Required!',
      nric: 'Value Required!',
      passport: 'Value Required!'
    };


    const actualErrors = validateTraveller(input);

    expect(actualErrors).to.deep.equal(expectedErrors);
  });
});
