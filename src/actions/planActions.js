import * as types from '../constants/actionTypes';
import { insertDecimal } from '../utils/numberUtils.js';
import objectAssign from 'object-assign';

// initially load plans to state
export const loadPlansSuccess = (plans) => {
  return { type: types.LOAD_PLANS, payload: plans };
};

// action after a plan was selected from plans
export const selectedPlanSuccess = (plans) => {
  return { type: types.PLAN_SELECTED, payload: plans };
};

/**
 * Toggle select plan
 *
 * Plans will be unselected by default,
 * Will look for the selected planId on plans
 * and set that plan flag selected to true.
 * Then dispatch the updated plans.
 *
 * @param {array} plans
 * @param {object} selected plan
 */
export const selectPlan = (plans, plan) => {
  const selectedPlan = objectAssign({}, plan);
  selectedPlan.selected = true;

  const planList = objectAssign([], plans);
  const selectionPlans = planList.map(planItem => {
    const unselectedPlan = objectAssign({}, planItem);
    unselectedPlan.selected = false;
    return planItem.planId === selectedPlan.planId ? selectedPlan : unselectedPlan;
  });

  return dispatch => dispatch(selectedPlanSuccess(selectionPlans));
};

// action after an addOn was selected from a plan
export const selectedAddOnSuccess = (plan) => {
  return { type: types.ADDON_SELECTED, payload: plan };
};

/**
 * Toggle select Add-On
 *
 * Select or unselect addOn base on 'selected' property.
 * Selected addOn's 'fee' will be added to selection's 'totalFee',
 * otherwise will deduct 'totalFee' using that 'fee' value.
 *
 * @param {object} plan - selected plan
 * @param {object} addOn - selected add-on
 */
export const selectAddOn = (plan, addOn) => {
  const selectedAddOn = objectAssign({}, addOn);
  const selectedPlan = objectAssign({}, plan);
  selectedAddOn.selected = !selectedAddOn.selected;

  selectedPlan.addOns = selectedPlan.addOns.map(addOnItem => {
    if (addOnItem.addOnId === selectedAddOn.addOnId) {
      // add or deduct addOn's fee from the selectedPlan's total fee
      if (selectedAddOn.selected) {
        selectedPlan.totalFee = insertDecimal(parseFloat(selectedPlan.totalFee) + parseFloat(addOnItem.fee));
      } else {
        selectedPlan.totalFee = insertDecimal(parseFloat(selectedPlan.totalFee) - parseFloat(addOnItem.fee));
      }
      return selectedAddOn;
    }

    return addOnItem;
  });

  return dispatch => dispatch(selectedAddOnSuccess(selectedPlan));
};


/**
 * Toggle expand plan
 *
 * Make plan expandable on mobile view
 *
 * @param {array} plans
 * @param {object} expanded plan
 */
export const expandPlan = (plans, plan) => {
  const expandedPlan = objectAssign({}, plan);
  expandedPlan.expanded = !expandedPlan.expanded;

  const planList = objectAssign([], plans);
  const expandedPlans = planList.map(planItem => {
    return planItem.planId === expandedPlan.planId ? expandedPlan : planItem;
  });

  return dispatch => dispatch({ type: types.PLAN_SELECTED, payload: expandedPlans });
};
