import objectAssign from 'object-assign';

import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { payment } from '../constants/status';
import paths from '../constants/routePaths';

export default function paymentReducer(state = initialState.payment, action) {
  switch (action.type) {
    case types.PAYMENT:
        return state;

    case types.GET_PAYMENT_STATUS:
      return objectAssign({}, state, { status: action.payload, isLoading: false });

    case types.GET_PAYMENT_STATUS_ERROR:
      return objectAssign({}, state, { status: payment.PENDING, isLoading: false });

    case types.LOCATION_CHANGE:
      const originalState = initialState.payment;

      switch(action.payload.pathname) {
        case paths.INDEX:
          return originalState;
        case paths.TRAVEL_INSURANCE:
          return originalState;
        case paths.PLAN_SELECTION:
          return originalState;
        case paths.CUSTOMER_DETAILS:
          return originalState;
        case paths.SUMMARY_DETAILS:
          return state;
        case paths.PAYMENT_DETAILS:
          return state;
        case paths.PAYMENT_CONFIRMATION:
          return state;
        default:
          return originalState;
      }

    default:
      return state;
  }
}
