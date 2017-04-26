/* eslint-disable react/no-multi-comp */
import React, { PropTypes } from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import travellerTypes from '../../constants/travellerTypes';
import { I18n } from 'react-redux-i18n';

const getLabel = (customer, isPolicyHolder) => {
  if (isPolicyHolder) {
    return I18n.t('titles.policyHolder');
  } else if (customer.travellerType === travellerTypes.ADULT) {
    return `${I18n.t('labels.adult')} ${customer.travellerTypeIndex + 2}`;
  } else if (customer.travellerType === travellerTypes.CHILD) {
    return `${I18n.t('labels.child')} ${customer.travellerTypeIndex + 1}`;
  }

  return '';
};

const displayPersonalInformation = (customerFields) => (
  <div>
    <Row>
      <Col sm={6}>
        {I18n.t('labels.dateOfBirth')} {customerFields.dateOfBirth}
      </Col>
      <Col sm={6}>
        {I18n.t('labels.gender')}: {customerFields.gender}
      </Col>
    </Row>
    <Row>
      <Col sm={6}>
        {I18n.t('labels.nationality')}: {customerFields.nationality}
      </Col>
      <Col sm={6}>
        {I18n.t('labels.nric')}: {customerFields.nric}
      </Col>
    </Row>
    <Row>
      <Col sm={6}>
        {I18n.t('labels.passport')}: {customerFields.passport}
      </Col>
    </Row>
  </div>
);

const displayContactDetails = (customerFields) => (
  <div style={{ marginTop: '10px' }}>
    <Row>
      <Col sm={12}>
        {I18n.t('titles.contactDetails')}
      </Col>
    </Row>
    <Row>
      <Col sm={6}>
        {I18n.t('labels.email')}: {customerFields.email}
      </Col>
      <Col sm={6}>
        {I18n.t('labels.phoneNumber')}: {customerFields.phoneNumber}
      </Col>
    </Row>
    <Row>
      <Col sm={6}>
        {I18n.t('labels.postCode')}: {customerFields.postCode}
      </Col>
      <Col sm={6}>
        {I18n.t('labels.address')}: {customerFields.address}
      </Col>
    </Row>
  </div>
);

const CustomerSummaryPanel = ({ customer, onEdit, isPolicyHolder }) => (
  <Panel>
    <Row>
      <Col sm={12}>
        {`${getLabel(customer, isPolicyHolder)} - ${customer.formFields.firstName} ${customer.formFields.lastName}`}
        <a href="#edit" style={{ float: 'right' }} onClick={onEdit}>
          <i className="glyphicon glyphicon-pencil"></i>
        </a>
      </Col>
    </Row>
    {displayPersonalInformation(customer.formFields)}
    {isPolicyHolder && displayContactDetails(customer.formFields)}
  </Panel>
);

CustomerSummaryPanel.propTypes = {
  customer: PropTypes.object,
  isPolicyHolder: PropTypes.bool,
  onEdit: PropTypes.func
};

export default CustomerSummaryPanel;
