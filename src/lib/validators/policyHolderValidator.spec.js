import { expect } from 'chai';
import validatePolicyHolder from './policyHolderValidator';

describe('policyHolderValidator', () => {
  it('should create error if fields are empty', () => {
    const inputState = {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      nric: '',
      passport: '',
      email: '',
      phoneNumber: '',
      postCode: '',
      address: ''
    };

    const expectedErrors = {
      firstName: 'Value Required!',
      lastName: 'Value Required!',
      dateOfBirth: 'Please select date!',
      gender: 'Value Required!',
      nationality: 'Value Required!',
      nric: 'Value Required!',
      passport: 'Value Required!',
      email: 'Value Required!',
      phoneNumber: 'Value Required!',
      postCode: 'Value Required!',
      address: 'Value Required!'
    };

    const actualErrors = validatePolicyHolder(inputState);

    expect(actualErrors).to.deep.equal(expectedErrors);
  });
});
