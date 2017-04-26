import objectAssign from 'object-assign';

import initialState from './initialState';
import * as types from '../constants/actionTypes';
import paths from '../constants/routePaths';

export default function orderReducer(state = initialState.step, action) {
  const currentStep = state.current;

  switch (action.type) {
    case types.LOCATION_CHANGE:
      switch(action.payload.pathname) {
        case paths.INDEX:
          return objectAssign({}, state, { current: 1, previous: currentStep });
        case paths.TRAVEL_INSURANCE:
          return objectAssign({}, state, { current: 1, previous: currentStep });
        case paths.PLAN_SELECTION:
          return objectAssign({}, state, { current: 2, previous: currentStep });
        case paths.CUSTOMER_DETAILS:
          return objectAssign({}, state, { current: 3, previous: currentStep });
        case paths.SUMMARY_DETAILS:
          return objectAssign({}, state, { current: 3, previous: currentStep });
        case paths.PAYMENT_DETAILS:
          return objectAssign({}, state, { current: 4, previous: currentStep });
        case paths.PAYMENT_CONFIRMATION:
          return objectAssign({}, state, { current: 5, previous: currentStep });
        default:
          return objectAssign({}, state, { current: 1, previous: currentStep });
      }

    default:
      return state;

  }

}
