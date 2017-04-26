import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import { Row, Col, Panel } from 'react-bootstrap';
import TextField from '../../components/TextField/TextField';
import DateTime from 'react-datetime';
import RadioButton from '../../components/RadioButton/RadioButton';
import validatePolicyHolder from '../../lib/validators/policyHolderValidator';

import { updatePolicyHolderFields } from '../../actions/customerDetails/policyHolderActions';
import RULES from '../../constants/rules';
import { I18n } from 'react-redux-i18n';

class PolicyHolderForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formFields: this.props.formFields,
      errors: {}
    };
  }

  _onFieldChange(field, value) {
    this.setState({
      formFields: {
        ...this.state.formFields,
        [field]: value || ''
      },
      errors: _.omit(this.state.errors, [field])
    });
  }

  _onSave() {
    const errors = validatePolicyHolder(this.state.formFields);
    this.setState({ errors });

    if(Object.keys(errors).length === 0) {
      this.props.updatePolicyHolderFields(this.state.formFields);
      this.props.goToNextForm();
    }
  }

  _firstName() {
    return (
      <TextField
        labelName={I18n.t('labels.firstName')}
        value={this.state.formFields.firstName}
        onChange={(ev) => this._onFieldChange('firstName', ev.target.value)}
        errorText={this.state.errors.firstName}
      />
    );
  }

  _lastName() {
    return (
      <TextField
        labelName={I18n.t('labels.lastName')}
        value={this.state.formFields.lastName}
        onChange={(ev) => this._onFieldChange('lastName', ev.target.value)}
        errorText={this.state.errors.lastName}
      />
    );
  }

  _dateOfBirth() {
    return (
      <div className="axa-label-small">
        <label>{I18n.t('labels.dateOfBirth')}</label>
        <DateTime
          value={moment(this.state.formFields.dateOfBirth, RULES.DATE_FORMAT)}
          onChange={(value) => this._onFieldChange('dateOfBirth', moment(value).format(RULES.DATE_FORMAT))}
          closeOnSelect={true}
          closeOnTab={true}
          timeFormat={false}
          dateFormat={RULES.DATE_FORMAT}
          inputProps={{
            placeholder: 'mm / dd / yyyy'
          }}
          viewMode="years"
        />
        <div className="error-text">
          {this.state.errors.dateOfBirth}
        </div>
      </div>
    );
  }

  _gender() {
    return (
      <div>
        <div className="axa-label-small">
          <label>{I18n.t('labels.gender')}</label>
        </div>
        <RadioButton
          name="male"
          labelName={I18n.t('labels.male')}
          target={this.state.formFields.gender}
          update={() => this._onFieldChange('gender', 'male')}
          style={{ width: '40%', float: 'left' }}
        />
        <RadioButton
          name="female"
          labelName={I18n.t('labels.female')}
          target={this.state.formFields.gender}
          update={() => this._onFieldChange('gender', 'female')}
          style={{ width: '40%', float: 'left' }}
        />
        <div
          className="error-text"
          style={{ clear: 'both' }}
        >
          {this.state.errors.gender}
        </div>
      </div>
    );
  }

  _nric() {
    return (
      <TextField
        labelName={I18n.t('labels.nric')}
        value={this.state.formFields.nric}
        onChange={(ev) => this._onFieldChange('nric', ev.target.value)}
        errorText={this.state.errors.nric}
      />
    );
  }

  _nationality() {
    return (
      <TextField
        labelName={I18n.t('labels.nationality')}
        value={this.state.formFields.nationality}
        onChange={(ev) => this._onFieldChange('nationality', ev.target.value)}
        errorText={this.state.errors.nationality}
      />
    );
  }

  _passport() {
    return (
      <TextField
        labelName={I18n.t('labels.passport')}
        value={this.state.formFields.passport}
        onChange={(ev) => this._onFieldChange('passport', ev.target.value)}
        errorText={this.state.errors.passport}
      />
    );
  }

  _email() {
    return (
      <TextField
        labelName={I18n.t('labels.email')}
        value={this.state.formFields.email}
        onChange={(ev) => this._onFieldChange('email', ev.target.value)}
        errorText={this.state.errors.email}
      />
    );
  }

  _phoneNumber() {
    return (
      <TextField
        labelName={I18n.t('labels.phoneNumber')}
        value={this.state.formFields.phoneNumber}
        onChange={(ev) => this._onFieldChange('phoneNumber', ev.target.value)}
        errorText={this.state.errors.phoneNumber}
      />
    );
  }

  _postCode() {
    return (
      <TextField
        labelName={I18n.t('labels.postCode')}
        value={this.state.formFields.postCode}
        onChange={(ev) => this._onFieldChange('postCode', ev.target.value)}
        errorText={this.state.errors.postCode}
      />
    );
  }

  _address() {
    return (
      <TextField
        labelName={I18n.t('labels.address')}
        value={this.state.formFields.address}
        onChange={(ev) => this._onFieldChange('address', ev.target.value)}
        errorText={this.state.errors.address}
      />
    );
  }

  render() {
    return (
      <Panel header={I18n.t('titles.policyHolder')}>
        <div className="form">
          <Row>
            <Col sm={6} lg={6}>
              {this._firstName()}
            </Col>
            <Col sm={6} lg={6}>
              {this._lastName()}
            </Col>
          </Row>
          <Row>
            <Col sm={6} lg={6}>
              {this._dateOfBirth()}
            </Col>
            <Col sm={6} lg={6}>
              {this._gender()}
            </Col>
          </Row>
          <Row>
            <Col sm={6} lg={6}>
              {this._nric()}
            </Col>
            <Col sm={6} lg={6}>
              {this._nationality()}
            </Col>
          </Row>
          <Row>
            <Col sm={6} lg={6}>
              {this._passport()}
            </Col>
          </Row>
          <Row>
            <Col sm={6} lg={6}>
              {this._email()}
            </Col>
            <Col sm={6} lg={6}>
              {this._phoneNumber()}
            </Col>
          </Row>
          <Row>
            <Col sm={6} lg={6}>
              {this._postCode()}
            </Col>
            <Col sm={6} lg={6}>
              {this._address()}
            </Col>
          </Row>
        </div>
        <button className="btn btn-axa" onClick={this._onSave.bind(this)}>
          {I18n.t('buttons.save')}
        </button>
      </Panel>
    );
  }
}

PolicyHolderForm.propTypes = {
  formFields: PropTypes.object,
  errors: PropTypes.object,
  i18n: PropTypes.object,
  updatePolicyHolderFields: PropTypes.func,
  goToNextForm: PropTypes.func
};

const mapStateToProps = ({ policyHolder, i18n }) => (
  {
    formFields: policyHolder.formFields,
    errors: policyHolder.errors,
    i18n
  }
);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    updatePolicyHolderFields
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(PolicyHolderForm);
