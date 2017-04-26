import React, { PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

const ModalWrapper = ({ title, content, footer, show, onHide }) => (
  <Modal show={show} onHide={onHide} bsSize="large" aria-labelledby="contained-modal-title-lg">
    <Modal.Header closeButton>
      <h6 className="modal-title">{title}</h6>
    </Modal.Header>
    <Modal.Body>
      {content}
    </Modal.Body>
    {footer &&
    <Modal.Footer>
      {footer} 
    </Modal.Footer>
    }
  </Modal>
);

ModalWrapper.propTypes = {
  title: PropTypes.string,
  content: PropTypes.object,
  footer: PropTypes.object,
  show: PropTypes.bool,
  onHide: PropTypes.func
};

export default ModalWrapper;