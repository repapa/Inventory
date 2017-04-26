import objectAssign from 'object-assign';

import initialState from './initialState';
import { getSelectionData } from '../utils/planSelectionUtil.js';
import * as types from '../constants/actionTypes';
import paths from '../constants/routePaths';

export default function selectionReducer(state = initialState.selection, action) {
  switch (action.type) {
    case types.PLAN_SELECTED:
      const plans = objectAssign([], action.payload);
      const selectedPlan = plans.filter(plan => plan.selected)[0];
      return objectAssign({}, state, getSelectionData(selectedPlan));

    case types.ADDON_SELECTED:
      return objectAssign({}, state, getSelectionData(action.payload));

    case types.LOCATION_CHANGE:
      const originalState = initialState.plans;

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
        case paths.PAYMENT_PENDING:
          return state;
        default:
          return originalState;
      }

    default:
      return state;
  }
}
