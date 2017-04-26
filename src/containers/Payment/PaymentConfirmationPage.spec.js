import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import configuredMockStore from 'redux-mock-store';

import * as types from '../../constants/actionTypes';
import { TestProvider } from '../../utils/testUtils';

import PaymentConfirmationPage from './PaymentConfirmationPage';
import initialState from '../../reducers/initialState';
import * as paymentActions from '../../actions/paymentActions';
import { payment } from '../../constants/status';

let sandbox;

const _mount = (state) => {
  sandbox = sinon.sandbox.create();

  const store = configuredMockStore()(state);

  const dispatch = sandbox.spy(store.dispatch);
  const checkPaymentStatus = () => {
    return (() => dispatch({
      type: types.GET_PAYMENT_STATUS,
      payload: payment.SUCCESS
    }))();
  };

  sandbox.stub(paymentActions, 'checkPaymentStatus', checkPaymentStatus);

  return mount(
    <TestProvider store={store}>
      <PaymentConfirmationPage />
    </TestProvider>
  );
};

describe('Payment Confirmation Page', () => {
  afterEach(done => {
    sandbox.restore();
    done();
  });

  it('should show loading screen', () => {
    const state = Object.assign({}, initialState,
      { order: { referenceNumber: 'AXA-123-SUCCESS' } },
      { payment: { isLoading: true } }
    );

    const wrapper = _mount(state);

    expect(wrapper.find('NotFound').length).to.be.equal(0);
    expect(wrapper.find('Loader').length).to.be.equal(1);

    expect(wrapper.find('PaymentSuccess').length).to.be.equal(0);

    expect(wrapper.find('PaymentPending').length).to.be.equal(0);
    expect(wrapper.find('PaymentError').length).to.be.equal(0);
  });

  it('should show not found page', () => {
    const state = Object.assign({}, initialState,
      { order: {} },
      { payment: { isLoading: false, status: payment.SUCCESS } }
    );

    const wrapper = _mount(state);

    expect(wrapper.find('NotFound').length).to.be.equal(1);
    expect(wrapper.find('Loader').length).to.be.equal(0);

    expect(wrapper.find('PaymentSuccess').length).to.be.equal(0);

    expect(wrapper.find('PaymentPending').length).to.be.equal(0);
    expect(wrapper.find('PaymentError').length).to.be.equal(0);
  });

  it('should show success page', () => {
    const state = Object.assign({}, initialState,
      { order: { referenceNumber: 'AXA-123-SUCCESS' } },
      { payment: { isLoading: false, status: payment.SUCCESS } }
    );

    const wrapper = _mount(state);

    expect(wrapper.find('NotFound').length).to.be.equal(0);
    expect(wrapper.find('Loader').length).to.be.equal(0);

    expect(wrapper.find('PaymentSuccess').length).to.be.equal(1);

    expect(wrapper.find('PaymentPending').length).to.be.equal(0);
    expect(wrapper.find('PaymentError').length).to.be.equal(0);
  });

  it('should show error page', () => {
    const state = Object.assign({}, initialState,
      { order: { referenceNumber: 'AXA-123-FAILED' } },
      { payment: { isLoading: false, status: payment.ERROR } }
    );

    const wrapper = _mount(state);

    expect(wrapper.find('NotFound').length).to.be.equal(0);
    expect(wrapper.find('Loader').length).to.be.equal(0);

    expect(wrapper.find('PaymentError').length).to.be.equal(1);

    expect(wrapper.find('PaymentPending').length).to.be.equal(0);
    expect(wrapper.find('PaymentSuccess').length).to.be.equal(0);
  });

  it('should show pending page', () => {
    const state = Object.assign({}, initialState,
      { order: { referenceNumber: 'AXA-123-PENDING' } },
      { payment: { isLoading: false, status: payment.PENDING } }
    );

    const wrapper = _mount(state);

    expect(wrapper.find('NotFound').length).to.be.equal(0);
    expect(wrapper.find('Loader').length).to.be.equal(0);

    expect(wrapper.find('PaymentPending').length).to.be.equal(1);

    expect(wrapper.find('PaymentError').length).to.be.equal(0);
    expect(wrapper.find('PaymentSuccess').length).to.be.equal(0);
  });
});
