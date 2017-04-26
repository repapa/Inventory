import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import configuredMockStore from 'redux-mock-store';
import { TestProvider } from '../../utils/testUtils';
import initialState from '../../reducers/initialState';

import CustomerDetailsPage from './CustomerDetailsPage';
import PolicyHolderForm from './PolicyHolderForm';
import TravellerForm from './TravellerForm';
import NotFound from '../../components/NotFound/NotFound';
import travellerTypes from '../../constants/travellerTypes';
import * as agreementActions from '../../actions/agreementsActions';

import * as types from '../../constants/actionTypes';

describe('Customer Details Page', () => {
  it('should render Policy Holder Form if displayedFormIndex is 0', () => {
    const stateConfig = {
      profile: {
        noOfAdult: "2",
        noOfChild: "2"
      },
      customerForm: {
        displayedFormIndex: 0
      },
      plans: [{
        selected: true,
        planId: "P-101"
      }]
    };

    const state = Object.assign({}, initialState, stateConfig);
    const store = configuredMockStore()(state);
    const wrapper = mount(
      <TestProvider store={store}>
        <CustomerDetailsPage />
      </TestProvider>
    );

    expect(wrapper.find(PolicyHolderForm)).to.have.length(1);
    expect(wrapper.find(TravellerForm)).to.have.length(0);
    expect(wrapper.find(NotFound)).to.have.length(0);
  });

  it('should render Traveller Form if displayedFormIndex is greater than 0', () => {
    const traveller = {
      ...initialState.traveller,
      travellerType: travellerTypes.ADULT,
      travellerFormIndex: 0
    };

    const stateConfig = {
      profile: {
        noOfAdult: "2",
        noOfChild: "2"
      },
      customerForm: {
        displayedFormIndex: 1
      },
      travellers: [traveller],
      plans: [{
        selected: true,
        planId: "P-101"
      }]
    };

    const state = Object.assign({}, initialState, stateConfig);
    const store = configuredMockStore()(state);
    const wrapper = mount(
      <TestProvider store={store}>
        <CustomerDetailsPage />
      </TestProvider>
    );

    expect(wrapper.find(PolicyHolderForm)).to.have.length(0);
    expect(wrapper.find(TravellerForm)).to.have.length(1);
    expect(wrapper.find(NotFound)).to.have.length(0);
  });

  it('should not render any forms if displayedFormIndex is greater than or equal the combined number of adults and child', () => {
    const stateConfig = {
      profile: {
        noOfAdult: "2",
        noOfChild: "2"
      },
      customerForm: {
        displayedFormIndex: 4
      },
      plans: [{
        selected: true,
        planId: "P-101"
      }]
    };

    const state = Object.assign({}, initialState, stateConfig);
    const store = configuredMockStore()(state);
    const wrapper = mount(
      <TestProvider store={store}>
        <CustomerDetailsPage />
      </TestProvider>
    );

    expect(wrapper.find(PolicyHolderForm)).to.have.length(0);
    expect(wrapper.find(TravellerForm)).to.have.length(0);
    expect(wrapper.find(NotFound)).to.have.length(0);
  });

  it('should not render forms if no plan is selected', () => {
    const stateConfig = {
      selectedPlan: {}
    };

    const state = Object.assign({}, initialState, stateConfig);
    const store = configuredMockStore()(state);

    const wrapper = mount(
      <TestProvider store={store}>
        <CustomerDetailsPage />
      </TestProvider>
    );

    expect(wrapper.find(PolicyHolderForm)).to.have.length(0);
    expect(wrapper.find(TravellerForm)).to.have.length(0);
    expect(wrapper.find(NotFound)).to.have.length(1);
  });

  it('should accept terms and conditions', () => {
    const initState = {
      selectedPlan: {},
      profile: {
        noOfChild: 0
      },
      customerForm: {
        displayedFormIndex: 0
      },
      plans: [{
        selected: true,
        planId: "P-101"
      }]
    };

    const state = Object.assign({}, initialState, initState);
    const store = configuredMockStore()(state);
    const dispatch = sinon.spy(store.dispatch);

    const acceptTermsAndConditions = (isAccepted) => {
      return (() => dispatch({
        type: types.TERMS_AND_CONDITIONS_ACCEPTED,
        payload: isAccepted
      }))();
    };

    sinon.stub(agreementActions, 'acceptTermsAndConditions', acceptTermsAndConditions);

    const wrapper = mount(
      <TestProvider store={store}>
        <CustomerDetailsPage />
      </TestProvider>
    );

    const termsAndConditions = wrapper.find('.terms-and-conditions').first();
    const termsAndConditionsBtn = termsAndConditions.find('input');

    termsAndConditionsBtn.simulate('click', { target: { checked: true } });
    const actions = store.getActions();

    expect(dispatch.calledOnce);
    expect(actions[0].type).to.equal(types.TERMS_AND_CONDITIONS_ACCEPTED);
    expect(actions[0].payload).to.equal(true);
    agreementActions.acceptTermsAndConditions.restore();
  });
});
