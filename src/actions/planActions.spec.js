import { expect } from 'chai';
import * as types from '../constants/actionTypes';
import * as planActions from './planActions';

import configuredMockStore from 'redux-mock-store';

describe('Plan Actions', () => {
  describe('Select plan', () => {
    it('should proceed to PLAN_SELECTED action', () => {
      const PLANS = [
        { planId: 'P-101' },
        { planId: 'P-102' }
      ];

      const EXPECTED_ACTION = { type: types.PLAN_SELECTED, payload: PLANS };
      const action = planActions.selectedPlanSuccess(PLANS);

      expect(action).to.deep.equal(EXPECTED_ACTION);
    });

    it('should call PLAN_SELECTED action after selecting a plan', () => {
      const mockStore = configuredMockStore();
      const EXPECTED_PLANS = [
        { planId: 'P-101', selected: true },
        { planId: 'P-102', selected: false }
      ];

      const EXPECTED_ACTION = {
        type: types.PLAN_SELECTED,
        payload: EXPECTED_PLANS
      };

      const SELECTED_PLAN = { planId: 'P-101' };
      const PLANS = [
        { planId: 'P-101' },
        { planId: 'P-102' }
      ];

      const store = mockStore({});
      planActions.selectPlan(PLANS, SELECTED_PLAN)(store.dispatch);

      const actions = store.getActions();

      expect(actions[0]).to.deep.equal(EXPECTED_ACTION);
    });
  });

  describe('Select addOn', () => {
    it('should proceed to ADDON_SELECTED action', () => {
      const PLAN = [
        { planId: 'P-101' }
      ];

      const EXPECTED_ACTION = { type: types.ADDON_SELECTED, payload: PLAN };
      const action = planActions.selectedAddOnSuccess(PLAN);

      expect(action).to.deep.equal(EXPECTED_ACTION);
    });

    it('should call ADDON_SELECTED action after selecting an addOn', () => {
      const mockStore = configuredMockStore();
      const EXPECTED_PLAN = {
        planId: 'P-101',
        addOns: [
          { addOnId: 'A-101', selected: true }
        ]
      };

      const EXPECTED_ACTION = {
        type: types.ADDON_SELECTED,
        payload: EXPECTED_PLAN
      };

      const SELECTED_ADDON = { addOnId: 'P-101' };
      const PLAN = {
        planId: 'P-101',
        addOns: [
          { addOnId: 'A-101', selected: true }
        ]
      };

      const store = mockStore({});
      planActions.selectAddOn(PLAN, SELECTED_ADDON)(store.dispatch);

      const actions = store.getActions();

      expect(actions[0]).to.deep.equal(EXPECTED_ACTION);
    });
  });
});
