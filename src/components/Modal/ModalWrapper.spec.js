import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ModalWrapper from './ModalWrapper';

describe('Modal Wrapper', () => {
  it('should display title and content', () => {
    const wrapper = shallow(
      <ModalWrapper
        title="Basic Title"
        content={<div className="content">Basic content</div>}
        />
    );

    expect(wrapper.find('.modal-title').text()).to.equal('Basic Title');
    expect(wrapper.find('.content').text()).to.equal('Basic content');
  });

  it('should close modal', () => {
    const onHide = sinon.spy();
    const wrapper = shallow(
      <ModalWrapper
        show={true}
        onHide={onHide}
        footer={<button onClick={onHide}>Close</button>}
        />
    );

    const closeBtn = wrapper.find('button');
    closeBtn.simulate('click');
    expect(wrapper.find('ModalHeader').props().closeButton).to.equal(true);
    expect(onHide.calledOnce).to.equal(true);
  });

  it('should trigger ok button', () => {
    const onOk = sinon.spy();
    const wrapper = shallow(
      <ModalWrapper
        show={true}
        footer={<button onClick={onOk}>Ok</button>}
        />
    );

    const closeBtn = wrapper.find('button');
    closeBtn.simulate('click');
    expect(onOk.calledOnce).to.equal(true);
  });
});
