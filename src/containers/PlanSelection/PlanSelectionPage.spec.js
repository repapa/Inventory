import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

// application test store
import { configureTestStore } from '../../store/configureStore';
// mock store
import configuredMockStore from 'redux-mock-store';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';

import PlanSelectionPage from './PlanSelectionPage';

const content = {
  contento: {
    coverages: {
      en: [
        {
          id: 'c1',
          value: 'Kecelakaan Diri'
        },
        {
          id: 'c2',
          value: 'Kecelakaan Diri'
        }
      ],
      id: [
        {
          id: 'c1',
          value: 'Kecelakaan Diri'
        },
        {
          id: 'c2',
          value: 'Kecelakaan Diri'
        }
      ]
    },
    's-l': {
      en: {
        USD: {
          value: '182000',
          coverages: [
            {
              'id':'c1',
              'value':'2,600,000,000'
            },
            {
              'id':'c2',
              'value':'5,200,000,000'
            }
          ]
        }, IDR: {
          value: '182000',
          coverages: [
            {
              'id':'c1',
              'value':'2,600,000,000'
            },
            {
              'id':'c2',
              'value':'5,200,000,000'
            }
          ]
        }
      },
      id: {
        USD: {
          value: '182000',
          coverages: [
            {
              'id':'c1',
              'value':'2,600,000,000'
            },
            {
              'id':'c2',
              'value':'5,200,000,000'
            }
          ]
        }, IDR: {
          value: '182000',
          coverages: [
            {
              'id':'c1',
              'value':'2,600,000,000'
            },
            {
              'id':'c2',
              'value':'5,200,000,000'
            }
          ]
        }
      }
    },
    's-h': {
      en: {
        USD: {
          value: '182000',
          coverages: [
            {
              'id':'c1',
              'value':'2,600,000,000'
            },
            {
              'id':'c2',
              'value':'5,200,000,000'
            }
          ]
        }, IDR: {
          value: '182000',
          coverages: [
            {
              'id':'c1',
              'value':'2,600,000,000'
            },
            {
              'id':'c2',
              'value':'5,200,000,000'
            }
          ]
        }
      },
      id: {
        USD: {
          value: '182000',
          coverages: [
            {
              'id':'c1',
              'value':'2,600,000,000'
            },
            {
              'id':'c2',
              'value':'5,200,000,000'
            }
          ]
        }, IDR: {
          value: '182000',
          coverages: [
            {
              'id':'c1',
              'value':'2,600,000,000'
            },
            {
              'id':'c2',
              'value':'5,200,000,000'
            }
          ]
        }
      }
    }
  }
};

const i18n = {
  locale: 'en'
};

const plans = [
  {
    planId: 's-l',
    planName: 'Lower Limits',
    fee: 142.07,
    totalFee: 142.07,
    addOns: [
      {
        addOnId: 'AO1',
        addOnName: 'Golf Equipment',
        fee: 1
      },
      {
        addOnId: 'AO2',
        addOnName: 'Sports Equipme',
        fee: 1
      }
    ]
  },
  {
    planId: 's-h',
    planName: 'Higher Limits',
    fee: 234.48,
    totalFee: 234.48,
    addOns: [
      {
        addOnId: 'AO1',
        addOnName: 'Golf Equipment',
        fee: 1
      },
      {
        addOnId: 'AO2',
        addOnName: 'Sports Equipme',
        fee: 1
      }
    ]
  }
];

const mountPage = (store) => mount(
  <TestProvider store={store}>
    <PlanSelectionPage />
  </TestProvider>
);

const getState = () => Object.assign({}, initialState, { plans }, { content }, { i18n }, { currency: 'USD' });

describe('Plan Selection Page', () => {
  it('should not show anything if no plans or products are avaible', () => {
    const store = configuredMockStore()(initialState);
    const wrapper = mountPage(store);

    const header = wrapper.find('.home_header').first();
    const plans = wrapper.find('ComparisionTable');
    expect(!!header.length).to.equal(false);
    expect(!!plans.length).to.equal(false);
    expect(!!wrapper.find('NotFound').length).to.equal(true);
  });

  it('should show Comparision Table with plans', () => {
    const store = configuredMockStore()(getState());
    const wrapper = mountPage(store);

    expect(!!wrapper.find('NotFound').length).to.equal(false);

    // show comparision table with 2 plans
    const comparisionTable = wrapper.find('ComparisionTable');
    expect(!!comparisionTable.length).to.equal(true);
    expect(comparisionTable.props().plans[0]).to.be.Object;
    expect(comparisionTable.props().plans[1]).to.be.Object;
  });

  it('should not have selected plans initially', () => {
    const store = configuredMockStore()(getState());
    const wrapper = mountPage(store);

    const comparisionTable = wrapper.find('ComparisionTable');

    expect(comparisionTable.props().plans[0].selected).be.undefined;
    expect(comparisionTable.props().plans[1].selected).be.undefined;

    // there should be 2 buttons
    expect(comparisionTable.find('button').length).to.equal(2);

    // both are unchecked
    expect(comparisionTable.find('button').at(0).text()).to.equal('Select');
    expect(comparisionTable.find('button').at(1).text()).to.equal('Select');
  });

  it('should toggles selection on different plans', () => {
    const state = getState();

    const store1 = configuredMockStore()(getState());

    const nonSelectedWrapper = mountPage(store1);
    const nonSelectedcomparisionTable = nonSelectedWrapper.find('ComparisionTable');

    // both are unchecked
    expect(nonSelectedcomparisionTable.props().plans[0].selected).be.undefined;
    expect(nonSelectedcomparisionTable.props().plans[1].selected).be.undefined;
    expect(nonSelectedcomparisionTable.find('button').at(0).text()).to.equal('Select');
    expect(nonSelectedcomparisionTable.find('button').at(1).text()).to.equal('Select');

    // select the second plan
    state.plans[0].selected = false;
    state.plans[1].selected = true;

    const store2 = configuredMockStore()(state);

    const secondSelectedWrapper = mountPage(store2);
    const secondSelectedComparisionTable = secondSelectedWrapper.find('ComparisionTable');

    // second plan is selected
    expect(secondSelectedComparisionTable.props().plans[0].selected).be.false;
    expect(secondSelectedComparisionTable.props().plans[1].selected).be.true;

    // first button is unselected
    // second button is selected and disabled
    expect(secondSelectedComparisionTable.find('button').at(0).text()).to.equal('Select');
    expect(secondSelectedComparisionTable.find('button').at(1).text()).to.equal('Selected');

    expect(secondSelectedComparisionTable.find('[disabled]')).to.have.length(1);
  });

  it('should show addons when a plan was selected', () => {
    const state = getState();

    state.plans[0].selected = false;
    state.plans[1].selected = false;
    const store1 = configuredMockStore()(state);

    // no plan select - no addon shown
    const nonSelectedPlanWrapper = mountPage(store1);
    const nonSelectedPlanAddOns = nonSelectedPlanWrapper.find('AddOn');
    expect(nonSelectedPlanAddOns.length).to.equal(0);

    // select the second plan
    state.plans[0].selected = false;
    state.plans[1].selected = true;
    const store2 = configuredMockStore()(state);

    // 2 addons are shown
    const secondSelectedPlanWrapper = mountPage(store2);
    const secondSelectedPlanAddOns = secondSelectedPlanWrapper.find('AddOn');
    expect(secondSelectedPlanAddOns.length).to.equal(2);
    expect(secondSelectedPlanAddOns.at(0).find('button').text()).to.equal('Add');
  });

  it('should update selection totalFees when plan and addon selection updated', () => {
    const EXPECTED_PLAN_ID = 's-l';
    const EXPECTED_TOTAL_FEE_WITHOUT_ADDON = '142.07';
    const EXPECTED_TOTAL_FEE_WITH_ADDON = '143.07';

    const store = configureTestStore(Object.assign(initialState, { plans, content, i18n }));
    const wrapper = mountPage(store);

    // click on select plan button
    const comparisionTable = wrapper.find('ComparisionTable');
    expect(comparisionTable.find('button').at(0).text()).to.equal('Select');
    comparisionTable.find('button').at(0).simulate('click');

    // // add on should show
    const addOns = wrapper.find('AddOn');
    const addOnButton = addOns.at(0).find('button');

    expect(addOns.length).to.equal(2);
    expect(addOnButton.text()).to.equal('Add');

    // // click on add on
    addOnButton.simulate('click');
    expect(addOnButton.text()).to.equal('Remove');

    const planSelectionPage = wrapper.find('PlanSelectionPage').at(0);
    const selectionState = planSelectionPage.props().selection;

    expect(selectionState.planId).to.equal(EXPECTED_PLAN_ID);
    expect(selectionState.addOnIds.length).to.equal(1);
    expect(selectionState.totalFee).to.equal(EXPECTED_TOTAL_FEE_WITH_ADDON);

    addOnButton.simulate('click');
    expect(addOnButton.text()).to.equal('Add');

    const selectionRemovedAddOn = wrapper.find('PlanSelectionPage').at(0).props().selection;
    expect(selectionRemovedAddOn.totalFee).to.equal(EXPECTED_TOTAL_FEE_WITHOUT_ADDON);
  });
});
