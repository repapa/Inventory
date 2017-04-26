import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import SendQuoteForm from './SendQuoteForm';

const profile = {
  test: 'test'
};

const selection = {
  test: 'test'
};

describe('Send Quote form component', () => {
  it('should not send quote if missing required field', (done) => {
    const wrapper = mount(
      <SendQuoteForm sendEmail={() => Promise.resolve('success')}
                      profile={profile}
                      selection={selection}
      />
    );

    expect(wrapper).to.exist;
    expect(wrapper.find('button')).to.exist;
    expect(wrapper.find('.alert').length).to.equal(0);

    wrapper.find('button').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('.alert').length).to.equal(1);
      expect(wrapper.find('.alert-danger').length).to.equal(1);
      expect(wrapper.find('.alert-success').length).to.equal(0);
      done();
    }, 1000);
  });

  it('should not send quote if email is incorrect', (done) => {
    const wrapper = mount(
      <SendQuoteForm sendEmail={() => Promise.resolve('success')}
                      profile={profile}
                      selection={selection}
      />
    );

    expect(wrapper).to.exist;
    expect(wrapper.find('button')).to.exist;
    expect(wrapper.find('.alert').length).to.equal(0);

    wrapper.find('input').simulate('change', { target: { value: 'test' } });
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('.alert').length).to.equal(1);
      expect(wrapper.find('.alert-danger').length).to.equal(1);
      expect(wrapper.find('.alert-success').length).to.equal(0);
      done();
    }, 1000);
  });

  it('should send quote if email is correct', (done) => {
    const wrapper = mount(
      <SendQuoteForm sendEmail={() => Promise.resolve('success')}
                      profile={profile}
                      selection={selection}
      />
    );

    expect(wrapper).to.exist;
    expect(wrapper.find('button')).to.exist;
    expect(wrapper.find('.alert').length).to.equal(0);

    wrapper.find('input').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('.alert').length).to.equal(1);
      expect(wrapper.find('.alert-danger').length).to.equal(0);
      expect(wrapper.find('.alert-success').length).to.equal(1);
      done();
    }, 1000);
  });

  it('should show error if request rejected by server', (done) => {
    const wrapper = mount(
      <SendQuoteForm sendEmail={() => Promise.reject(new Error())}
                      profile={profile}
                      selection={selection}
      />
    );

    expect(wrapper).to.exist;
    expect(wrapper.find('button')).to.exist;
    expect(wrapper.find('.alert').length).to.equal(0);

    wrapper.find('input').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('.alert').length).to.equal(1);
      expect(wrapper.find('.alert-danger').length).to.equal(1);
      expect(wrapper.find('.alert-success').length).to.equal(0);
      done();
    }, 1000);
  });
});
