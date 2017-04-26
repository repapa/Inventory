import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import PaymentError from './PaymentError';

describe('Payment Error component', () => {
  it('should display with order reference and contact form', () => {
    const ORDER_REFERENCE = 'AXA-123-ERROR';

    const wrapper = mount(
      <PaymentError orderReference={ORDER_REFERENCE} />
    );

    expect(wrapper.find('h1').text()).to.equal('Payment Error');
    expect(wrapper.find('.description').text()).to.contain(ORDER_REFERENCE);

    // should show contract form
    expect(wrapper.find('ContactForm')).to.have.length(1);
  });
});
