import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

// mock store
import configuredMockStore from 'redux-mock-store';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';

import ProgressBar from './ProgressBar';

describe('Progress Bar', () => {
  it('should show active > disabled > disabled > disabled for step 1', () => {
    const state = Object.assign({}, initialState);

    state.step = {
      current: 1,
      previous: 1
    };

    const store = configuredMockStore()(state);

    const wrapper = mount(
      <TestProvider store={store}>
        <ProgressBar />
      </TestProvider>
    );

    const actives = wrapper.find('.active').length;
    const completed = wrapper.find('.completed').length;
    const disabled = wrapper.find('.disabled').length;

    expect(actives).to.equal(1);
    expect(completed).to.equal(0);
    expect(disabled).to.equal(3);
  });

  it('should show completed > active > disabled > disabled for step 2', () => {
    const state = Object.assign({}, initialState);

    state.step = {
      current: 2,
      previous: 1
    };

    const store = configuredMockStore()(state);

    const wrapper = mount(
      <TestProvider store={store}>
        <ProgressBar />
      </TestProvider>
    );

    const actives = wrapper.find('.active').length;
    const completed = wrapper.find('.completed').length;
    const disabled = wrapper.find('.disabled').length;

    expect(actives).to.equal(1);
    expect(completed).to.equal(1);
    expect(disabled).to.equal(2);
  });

  it('should show completed > completed > active > disabled step 3', () => {
    const state = Object.assign({}, initialState);

    state.step = {
      current: 3,
      previous: 1
    };

    const store = configuredMockStore()(state);

    const wrapper = mount(
      <TestProvider store={store}>
        <ProgressBar />
      </TestProvider>
    );

    const actives = wrapper.find('.active').length;
    const completed = wrapper.find('.completed').length;
    const disabled = wrapper.find('.disabled').length;

    expect(actives).to.equal(1);
    expect(completed).to.equal(2);
    expect(disabled).to.equal(1);
  });

  it('should show completed > completed > completed > active for step 4', () => {
    const state = Object.assign({}, initialState);

    state.step = {
      current: 4,
      previous: 1
    };

    const store = configuredMockStore()(state);

    const wrapper = mount(
      <TestProvider store={store}>
        <ProgressBar />
      </TestProvider>
    );

    const actives = wrapper.find('.active').length;
    const completed = wrapper.find('.completed').length;
    const disabled = wrapper.find('.disabled').length;

    expect(actives).to.equal(1);
    expect(completed).to.equal(3);
    expect(disabled).to.equal(0);
  });

  it('should show all step completed and disabled for step 5', () => {
    const state = Object.assign({}, initialState);

    state.step = {
      current: 5,
      previous: 1
    };

    const store = configuredMockStore()(state);

    const wrapper = mount(
      <TestProvider store={store}>
        <ProgressBar />
      </TestProvider>
    );

    const completed = wrapper.find('.completed_b').length;

    expect(completed).to.equal(4);
  });
});
