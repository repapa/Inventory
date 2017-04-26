import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import moment from 'moment';

import CustomDatePicker from './CustomDatePicker';
import RULES from '../../constants/rules';

const sDate = moment().add(1, 'days').format(RULES.DATE_FORMAT);
const min = moment();
const max = moment().add(2, 'days');

describe('Custom DatePicker', () => {
  it('should display for normal case', () => {
    const wrapper = mount(
      <CustomDatePicker
        selectedDate={sDate}
      />
    );

    wrapper.simulate('click');
    expect(wrapper.find('.rdtDay').length > 0).to.equal(true);
  });

  it('should display for min and max', () => {
    const wrapper = mount(
      <CustomDatePicker
        selectedDate={sDate}
        min={min}
        max={max}
      />
    );

    wrapper.simulate('click');
    expect(wrapper.find('.rdtDay').length > 0).to.equal(true);
  });

  it('should display for min', () => {
    const wrapper = mount(
      <CustomDatePicker
        selectedDate={sDate}
        max={max}
      />
    );

    wrapper.simulate('click');
    expect(wrapper.find('.rdtDay').length > 0).to.equal(true);
  });

  it('should display for max', () => {
    const wrapper = mount(
      <CustomDatePicker
        selectedDate={sDate}
        min={min}
      />
    );

    wrapper.simulate('click');
    expect(wrapper.find('.rdtDay').length > 0).to.equal(true);
  });

  it('should display for disabled', () => {
    const wrapper = mount(
      <CustomDatePicker
        selectedDate={sDate}
        disabled={true}
      />
    );

    wrapper.simulate('click');
    expect(wrapper.find('.rdtDay.rdtDisabled').length > 0).to.equal(true);
  });
});
