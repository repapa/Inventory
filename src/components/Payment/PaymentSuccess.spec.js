import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import PaymentSuccess from './PaymentSuccess';

describe('Payment Success component', () => {
  it('should display with order reference', () => {
    const ORDER_REFERENCE = 'AXA-123-SUCCESS';

    const wrapper = mount(
      <PaymentSuccess orderReference={ORDER_REFERENCE} />
    );

    expect(wrapper.find('h1').text()).to.equal('Congratulations');
    expect(wrapper.find('.description').text()).to.contain(ORDER_REFERENCE);
  });
});
