import React, { PropTypes } from 'react';
import ModalWrapper from '../Modal/ModalWrapper';
import { I18n } from 'react-redux-i18n';

const TermsAndConditions = ({ show, onHide, onAccept, isAccepted }) => (
  <ModalWrapper
    title={I18n.t('titles.termsAndConditions')}
    content={<div className="pre-scrollable">
      <div>{I18n.t('contents.termsAndConditions')}</div>
    </div>}
    footer={(<div><button className="btn" onClick={onHide}>{I18n.t('buttons.close')}</button>
      {isAccepted ?
        <button className="btn btn-success" disabled>{I18n.t('buttons.accepted')}</button> :
        <button className="btn btn-axa" onClick={onAccept}>{I18n.t('buttons.accept')}</button>
      }</div>)}
    show={show}
    onHide={onHide}
    />
);

TermsAndConditions.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,  
  onAccept: PropTypes.func,
  isAccepted: PropTypes.bool
};

export default TermsAndConditions;
