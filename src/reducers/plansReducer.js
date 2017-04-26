import objectAssign from 'object-assign';

import initialState from './initialState';
import * as types from '../constants/actionTypes';
import paths from '../constants/routePaths';

export default function plansReducer(state = initialState.plans, action) {
  switch (action.type) {
    /**
     * Load plans
     *
     * add new field 'totalFee' for each plan
     * @payload {array} plans
     */
    case types.LOAD_PLANS:
      const loadedPlans = objectAssign([], action.payload);
      const feePlans = loadedPlans.map(loadedPlan => {
        const plan = objectAssign({}, loadedPlan);
        plan.totalFee = plan.fee;
        return plan;
      });
      return objectAssign([], feePlans);
    /**
     * @payload {array} updated plans
     */
    case types.PLAN_SELECTED:
      return objectAssign([], state, action.payload);

    /**
     * @payload {object} updated plan
     */
    case types.ADDON_SELECTED:
      const selectionPlan = action.payload;
      const selectionPlans = objectAssign([], state);
      const plans = selectionPlans.map(plan => {
        return plan.planId === selectionPlan.planId ? selectionPlan : plan;
      });

      return objectAssign([], state, plans);

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
