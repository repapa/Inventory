import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

const ModalButton = ({ title, show, onShow, buttonLabel, showContent, close }) => {
  return (
    <div>
      <button onClick={onShow} className="btn btn-axa">
        {buttonLabel}
      </button>
      <Modal
        show={show}
        onHide={close}
        container={this}
        aria-labelledby="contained-modal-title"
        bsSize="large"
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showContent}
        </Modal.Body>
      </Modal>
    </div>
  );
};

ModalButton.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  onShow: PropTypes.func,
  buttonLabel: PropTypes.string,
  showContent: PropTypes.element,
  close: PropTypes.func
};

export default ModalButton;


