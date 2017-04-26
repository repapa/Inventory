import objectAssign from 'object-assign';
import initialState from '../initialState';
import * as types from '../../constants/actionTypes';
import paths from '../../constants/routePaths';

export default function policyHolderReducer(state = initialState.policyHolder, action) {
  switch (action.type) {
    case types.POLICY_HOLDER_FORM_UPDATE_FIELDS:
      const { formFields } = action.payload;
      return objectAssign({}, state, {
        formFields,
        isFilled: true
      });

    case types.LOCATION_CHANGE:
      const originalState = initialState.policyHolder;

      switch(action.payload.pathname) {
        case paths.INDEX:
          return originalState;
        case paths.TRAVEL_INSURANCE:
          return originalState;
        case paths.PLAN_SELECTION:
          return state;
        case paths.CUSTOMER_DETAILS:
          return state;
        case paths.SUMMARY_DETAILS:
          return state;
        case paths.PAYMENT_DETAILS:
          return state;
        case paths.PAYMENT_CONFIRMATION:
          return state;
        case paths.PAYMENT_ERROR:
          return state;
        default:
          return originalState;
      }

    default:
      return state;
  }
}
