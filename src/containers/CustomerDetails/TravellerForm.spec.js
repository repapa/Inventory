import React from 'react';
import { mount } from 'enzyme';

import configuredMockStore from 'redux-mock-store';
import { TestProvider } from '../../utils/testUtils';

import TravellerForm from './TravellerForm';
import initialState from '../../reducers/initialState';
import travellerTypes from '../../constants/travellerTypes';

describe('Traveller Form', () => {
  it('should render traveller fields', () => {
    const state = Object.assign({}, initialState);
    const travellerConfig = {
      travellerType: travellerTypes.ADULT,
      travellerFormIndex: 0
    };

    state.travellers[0] = Object.assign({}, initialState.traveller, travellerConfig);
    const store = configuredMockStore()(state);

    mount(
      <TestProvider store={store}>
        <TravellerForm travellerIndex={0} />
      </TestProvider>
    );
  });
});
