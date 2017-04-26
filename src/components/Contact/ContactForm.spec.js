import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import ContactForm from './ContactForm';

describe('Contact form component', () => {
  it('should not proceed if required fields are missing', (done) => {
    const wrapper = mount(
      <ContactForm  comment="this is comment"
                    sendEmail={() => Promise.resolve('success')}
      />
    );

    expect(wrapper).to.exist;
    expect(wrapper.find('button')).to.exist;

    wrapper.find('button').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('.alert').length).to.equal(1);
      expect(wrapper.find('.alert-danger').length).to.equal(1);
      expect(wrapper.find('.alert-success').length).to.equal(0);
      done();
    }, 1000);
  });

  it('should show error if email is incorrect', (done) => {
    const wrapper = mount(
      <ContactForm  title="this is title"
                    sender="test"
                    comment="this is comment"
                    sendEmail={() => Promise.resolve('success')}
      />
    );

    expect(wrapper).to.exist;
    expect(wrapper.find('button')).to.exist;

    wrapper.find('button').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('.alert').length).to.equal(1);
      expect(wrapper.find('.alert-danger').length).to.equal(1);
      expect(wrapper.find('.alert-success').length).to.equal(0);
      done();
    }, 1000);
  });

  it('should send email if all required fields are filled', (done) => {
    const wrapper = mount(
      <ContactForm  title="this is title"
                    sender="test@example.com"
                    comment="this is comment"
                    sendEmail={() => Promise.resolve('success')}
      />
    );

    expect(wrapper).to.exist;
    expect(wrapper.find('button')).to.exist;

    wrapper.find('button').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('.alert').length).to.equal(1);
      expect(wrapper.find('.alert-danger').length).to.equal(0);
      expect(wrapper.find('.alert-success').length).to.equal(1);
      done();
    }, 1000);
  });

  it('should show error if get rejected by server', (done) => {
    const wrapper = mount(
      <ContactForm  title="this is title"
                    sender="test@example.com"
                    comment="this is comment"
                    sendEmail={() => Promise.reject('error')}
      />
    );

    expect(wrapper).to.exist;
    expect(wrapper.find('button')).to.exist;

    wrapper.find('button').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('.alert').length).to.equal(1);
      expect(wrapper.find('.alert-danger').length).to.equal(1);
      expect(wrapper.find('.alert-success').length).to.equal(0);
      done();
    }, 1000);
  });
});
