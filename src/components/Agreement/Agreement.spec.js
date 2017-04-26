import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import configuredMockStore from 'redux-mock-store';
import { configureTestStore } from '../../store/configureStore';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';

import Agreement from './Agreement';
import { acceptTermsAndConditions } from '../../actions/agreementsActions';

describe('Agreement', () => {

  describe('Terms and Conditions', () => {
    it('should show modal when link is clicked', () => {
      const store = configuredMockStore()(initialState);

      const wrapper = mount(
        <TestProvider store={store}>
          <Agreement />
        </TestProvider>
      );

      const modal = wrapper.find('TermsAndConditions').find('Modal').get(0);
      const link = wrapper.find('a');

      expect(modal.props.show).to.equal(false);
      link.simulate('click');
      expect(modal.props.show).to.equal(true);
    });

    it('should show error when not accepted and trying to purchase', () => {
      const store = configuredMockStore()(initialState);
      const wrapper = mount(
        <TestProvider store={store}>
          <Agreement
            isAccepted={false}
            isPurchasing={true}
            />
        </TestProvider>
      );

      const error = wrapper.find('.terms-conditions-error-msg');
      expect(!!error.length).to.equal(true);
      expect(error.text()).to.equal('Accept Error');
    });

    it('should accept the agreement', () => {
      const store = configureTestStore();
      const onAccept = () => {
        acceptTermsAndConditions(true)(store.dispatch);
      };

      const wrapper = mount(
        <TestProvider store={store}>
          <Agreement
            onAccept={onAccept}
            isAccepted={false}
            isPurchasing={false}
            />
        </TestProvider>
      );

      const agreement = wrapper.find('Agreement').get(0);

      // checkbox
      const check = wrapper.find('input');
      expect(agreement.props.isAccepted).to.equal(false);
      expect(check.props().checked).to.equal(false);
      
      check.simulate('click');
      const agreementState = store.getState().agreements;
      expect(agreementState.termsAndConditionsAccepted).to.equal(true);
    });
  });
});
