import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';

// application test store
import { configureTestStore } from '../../store/configureStore';
// mock store
import configuredMockStore from 'redux-mock-store';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';

import * as types from '../../constants/actionTypes';

import TravelInsurancePage from './TravelInsurancePage';
import * as profileActions from '../../actions/profileActions';
import * as quoteActions from '../../actions/quoteActions';

describe('Travel Insurance Page', () => {
  beforeEach(()=> {
    // assumed content and reference data is updated
    initialState.content = {
      updateState: 2
    };

    initialState.quote = {
      isLoading: false
    };
  });

  it('should have an initial view Travel Insurance', () => {
    const store = configuredMockStore()(initialState);
    const wrapper = mount(
      <TestProvider store={store}>
        <TravelInsurancePage />
      </TestProvider>
    );

    const header = wrapper.find('.home_header').first();
    expect(header.text()).to.equal('Your Travel Information');
    expect(!!wrapper.find('.form').first().length).to.equal(true);
  });

  it('should validate profile inputs', () => {
    const store = configuredMockStore()(initialState);
    const dispatch = sinon.spy(store.dispatch);

    /**
     * direct call the dispatch
     * because mock-store can not do this
     */
    const getProfileValidationError = (errors) => {
      return (() => dispatch({
        type: types.PROFILE_VALIDATION_ERROR,
        payload: { errors }
      }))();
    };

    sinon.stub(profileActions, 'getProfileValidationError', getProfileValidationError);

    const wrapper = mount(
      <TestProvider store={store}>
        <TravelInsurancePage />
      </TestProvider>
    );

    wrapper.find('button').simulate('click');

    const actions = store.getActions();
    expect(dispatch.calledOnce).to.equal(true);
    expect(actions[0].type).to.equal(types.PROFILE_VALIDATION_ERROR);
    expect(actions[0].payload).to.be.ok;
    expect(actions[0].payload).to.have.any.keys('errors');
    // restore stubbed fn
    profileActions.getProfileValidationError.restore();
  });

  it('should display errors to input when profile form is invalid', () => {
    // adding initial error object to profile
    const errors = {
      typeOfCover: 'Value required!'
    };

    initialState.profile.errors = errors;

    const store = configuredMockStore()(initialState);

    const wrapper = mount(
      <TestProvider store={store}>
        <TravelInsurancePage />
      </TestProvider>
    );

    const typeOfCoverWrapper = wrapper.find('#typeOfCover');
    expect(typeOfCoverWrapper.find('.error-text').text()).to.be.equal(errors.typeOfCover);
  });

  it('should get quote when getQuote button is clicked', () => {
    // assumed profile has valid inputs
    initialState.profile = {
      arrival: moment(),
      departure: moment(),
      noOfAdult: 1,
      noOfChild: 0,
      region: 1,
      typeOfCover: 'single',
      typeOfPlan: 'individual',
      errors: {} // no errors
    };

    const store = configuredMockStore()(initialState);
    const dispatch = sinon.spy(store.dispatch);
    // assumed quotation is succesful
    const getQuote = (profile) => {
      return (() => dispatch({
        type: types.GET_QUOTE_SUCCESS,
        payload: {},
        profile: profile
      }))();
    };

    sinon.stub(quoteActions, 'getQuote', getQuote);

    const wrapper = mount(
      <TestProvider store={store}>
        <TravelInsurancePage />
      </TestProvider>
    );

    wrapper.find('button').simulate('click');

    const actions = store.getActions();
    expect(dispatch.calledOnce);
    expect(actions[0].type).to.equal(types.GET_QUOTE_SUCCESS);
    // check if profile data is actually passed
    expect(actions[0].profile).to.deep.equal(initialState.profile);
    quoteActions.getQuote.restore();
  });

  it('should show loading page while calling getQuote', () => {
    /**
     * Using the app store
     */
    const store = configureTestStore();
    const wrapper = mount(
      <TestProvider store={store}>
        <TravelInsurancePage />
      </TestProvider>
    );

    const getQuote = () => {
      store.dispatch({ type: types.GET_QUOTE });
      // in action check if the page is actually loading
      expect(wrapper.find('Loader').length).to.be.ok;
      expect(store.getState().quote.isLoading).to.equal(true);

      return (dispatch) => dispatch({
        type: types.GET_QUOTE_SUCCESS,
        payload: {}
      });
    };

    sinon.stub(quoteActions, 'getQuote', getQuote);

    quoteActions.getQuote()(store.dispatch);
    // after a quotation is successful, make sure loading page is removed
    expect(store.getState().quote.isLoading).to.equal(false);
    expect(wrapper.find('Loader').length).to.equal(0);
    quoteActions.getQuote.restore();
  });
});
