import React from 'react';
import { mount } from 'enzyme';

import configuredMockStore from 'redux-mock-store';
import { TestProvider } from '../../utils/testUtils';

import PolicyHolderForm from './PolicyHolderForm';

import initialState from '../../reducers/initialState';

describe('Policy Holder Form', () => {
  it('should render policy holder fields', () => {
    const state = Object.assign({}, initialState);
    const store = configuredMockStore()(state);
    mount(
      <TestProvider store={store}>
        <PolicyHolderForm />
      </TestProvider>
    );
  });
});
