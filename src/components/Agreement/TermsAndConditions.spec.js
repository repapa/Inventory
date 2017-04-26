import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import configuredMockStore from 'redux-mock-store';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';

import TermsAndConditions from './TermsAndConditions';

describe('Terms and Conditions Modal', () => {
  it('should have title and content', () => {
    const store = configuredMockStore()(initialState);
    const wrapper = mount(
      <TestProvider store={store}>
        <TermsAndConditions />
      </TestProvider>
    );

    const modal = wrapper.find('ModalWrapper').at(0);
    expect(modal.props().title).to.equal('Terms And Conditions');
    expect(modal.props().content).to.not.undefined;
  });
});
