import { expect } from 'chai';
import * as types from '../constants/actionTypes';
import * as profileActions from './profileActions';

import configuredMockStore from 'redux-mock-store';

describe('Profile Actions', () => {
  it('should call PROFILE_FORM_UPDATE action with exact payload', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    
    const EXPECTED_PAYLOAD = { name: 'name', value: 'value' };
    const EXPECTED_ACTION = { type: types.PROFILE_FORM_UPDATE, payload: EXPECTED_PAYLOAD };
    profileActions.updateProfile('name', 'value')(store.dispatch);

    const actions = store.getActions();

    expect(actions[0]).to.deep.equal(EXPECTED_ACTION);
  });

  it('should call PROFILE_VALIDATION_ERROR action and get validation errors', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    
    const EXPECTED_ERRORS = [
      { name: 'Required' },
      { number: 'Not a number' }
    ];

    profileActions.getProfileValidationError(EXPECTED_ERRORS)(store.dispatch);
    const actions = store.getActions();

    expect(actions[0].type).to.equal(types.PROFILE_VALIDATION_ERROR);
    expect(actions[0].payload.errors).to.deep.equal(EXPECTED_ERRORS);
  });
});
