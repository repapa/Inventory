import objectAssign from 'object-assign';

import initialState from './initialState';
import * as types from '../constants/actionTypes';
import paths from '../constants/routePaths';

export default function orderReducer(state = initialState.order, action) {
  switch (action.type) {
    case types.GET_ORDER:
      return objectAssign({}, state, { isLoading: true });

    /**
     * Load Order Reference Number
     *
     * @payload {string} referenceNumber
     */
    case types.GET_ORDER_REFERENCE:
      return objectAssign({}, state, { referenceNumber: action.payload, isLoading: false });

    case types.GET_ORDER_REFERENCE_ERROR:
      return objectAssign({}, state, action.payload);

    case types.LOCATION_CHANGE:
      const originalState = initialState.order;

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
        case paths.PAYMENT_ERROR:
          return state;
        case paths.PAYMENT_PENDING:
          return state;
        default:
          return originalState;
      }

    default:
      return state;

  }

}
