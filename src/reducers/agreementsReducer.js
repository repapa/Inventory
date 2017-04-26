import objectAssign from 'object-assign';

import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function orderReducer(state = initialState.agreements, action) {
  switch (action.type) {
    case types.TERMS_AND_CONDITIONS_ACCEPTED:
      return objectAssign({}, state, { termsAndConditionsAccepted: action.payload });

    default:
      return state;

  }

}
