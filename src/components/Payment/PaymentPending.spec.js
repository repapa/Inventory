import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import PaymentPending from './PaymentPending';

describe('Payment Pending component', () => {
  it('should display with order reference', () => {
    const ORDER_REFERENCE = 'AXA-123-PENDING';

    const wrapper = mount(
      <PaymentPending orderReference={ORDER_REFERENCE} />
    );

    expect(wrapper.find('h1').text()).to.equal('Payment Is Pending');
    expect(wrapper.find('.description').text()).to.contain(ORDER_REFERENCE);
  });
});
