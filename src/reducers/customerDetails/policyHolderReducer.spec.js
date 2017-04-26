import { expect } from 'chai';
import policyHolderReducer from './policyHolderReducer';
import * as actions from '../../actions/customerDetails/policyHolderActions';

describe('Policy Holder Reducer', () => {
  it('should update state of form field and validate field when passed POLICY_HOLDER_FORM_UPDATE_FIELD', () => {
    const initialState = {
      formFields: {
        email: '',
        address: ''
      },
      isFilled: false
    };

    const newFields = {
      email: 'loremipsum@gmail.com',
      address: 'Makati'
    };

    const expectedState = {
      formFields: newFields,
      isFilled: true
    };

    const action = actions.updatePolicyHolderFields(newFields);
    const newState = policyHolderReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });
});
