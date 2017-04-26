import React, { PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { Row, Col, Panel } from 'react-bootstrap';
import TextField from '../../components/TextField/TextField';
import RadioButton from '../../components/RadioButton/RadioButton';
import DateTime from 'react-datetime';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import travellerTypes from '../../constants/travellerTypes';
import { updateTravellerFields } from '../../actions/customerDetails/travellerActions';
import validateTraveller from '../../lib/validators/travellerValidator.js';
import { I18n } from 'react-redux-i18n';

import RULES from '../../constants/rules';

class TravellerForm extends React.Component {
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
        [field]: value
      },
      errors: _.omit(this.state.errors, [field])
    });
  }

  _onSave() {
    const errors = validateTraveller(this.state.formFields);
    this.setState({ errors });

    if(Object.keys(errors).length === 0) {
      this.props.updateTravellerFields(this.props.travellerIndex, this.state.formFields);
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
          name={`${this.props.travellerIndex} male`}
          labelName={I18n.t('labels.male')}
          target={`${this.props.travellerIndex} ${this.state.formFields.gender}`}
          update={() => this._onFieldChange('gender', 'male')}
          style={{ width: '40%', float: 'left' }}
        />
        <RadioButton
          name={`${this.props.travellerIndex} female`}
          labelName={I18n.t('labels.female')}
          target={`${this.props.travellerIndex} ${this.state.formFields.gender}`}
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

  _getFormLabel() {
    if (this.props.travellerType === travellerTypes.ADULT) {
      // First Adult uses policy holder form instead of traveller form
      return `${I18n.t('labels.adult')} ${this.props.travellerTypeIndex + 2}/${this.props.travellingAdults}`;
    } else if (this.props.travellerType === travellerTypes.CHILD) {
      return `${I18n.t('labels.child')} ${this.props.travellerTypeIndex + 1}/${this.props.travellingChildren}`;
    }
    return '';
  }

  _renderFields() {
    return (
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
      </div>
    );
  }

  render() {
    return (
      <Panel header={this._getFormLabel()}>
        {this._renderFields()}
        <button className="btn btn-axa" onClick={this._onSave.bind(this)}>{I18n.t('buttons.save')}</button>
      </Panel>
    );
  }
}

TravellerForm.propTypes = {
  travellingAdults: PropTypes.number,
  travellingChildren: PropTypes.number,
  travellerType: PropTypes.string,
  travellerTypeIndex: PropTypes.number,
  travellerIndex: PropTypes.number,
  formFields: PropTypes.object,
  i18n: PropTypes.object,
  errors: PropTypes.object,
  updateTravellerFields: PropTypes.func,
  goToNextForm: PropTypes.func
};

const mapStateToProps = ({ travellers, profile, i18n }, ownProps) => (
  {
    formFields: travellers[ownProps.travellerIndex].formFields,
    errors: travellers[ownProps.travellerIndex].errors,
    travellerType: travellers[ownProps.travellerIndex].travellerType,
    travellerTypeIndex: travellers[ownProps.travellerIndex].travellerTypeIndex,
    travellingAdults: + profile.noOfAdult || 0,
    travellingChildren: + profile.noOfChild || 0,
    i18n
  }
);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    updateTravellerFields
  }, dispatch)
);

export {
  TravellerForm as TravellerFormComponent
};

export default connect(mapStateToProps, mapDispatchToProps)(TravellerForm);
