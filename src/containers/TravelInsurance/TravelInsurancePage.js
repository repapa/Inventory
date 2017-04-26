import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { Container, Row, Col } from 'react-grid-system';
import { FormGroup } from 'react-bootstrap';

import Loader from '../../components/Loader/Loader';
import RadioButton from '../../components/RadioButton/RadioButton';
import CustomDatePicker from '../../components/DatePicker/CustomDatePicker';
import Select from 'react-select';

import { getQuote } from '../../actions/quoteActions';
import { updateProfile, updateAll, getProfileValidationError } from '../../actions/profileActions';
import { initializeTravellerForms } from '../../actions/customerDetails/travellerActions';

import validateProfile from '../../lib/validators/profileValidator';
import { getArrayFromNumber } from '../../lib/util';
import RULES from '../../constants/rules';

import Profile from './Profile';
import { I18n } from 'react-redux-i18n';

class TravelInsurancePage extends Component {
  constructor(props, context) {
    super(props, context);

    this._onGetQuote = this._onGetQuote.bind(this);
  }

  componentWillMount() {
    // update profile data based on query string
    const params = this.props.location ? this.props.location.query : {};
    const profile = new Profile(params);

    // only update profile data if there is no plan
    if((!this.props.plans || this.props.plans.length === 0) && profile.isValid()) {
      this.props.updateAll(profile);
    }
  }

  _onGetQuote() {
    const { profile, getQuote, getProfileValidationError, initializeTravellerForms } = this.props;
    const errors = validateProfile(profile);

    if (Object.keys(errors).length > 0) {
      getProfileValidationError(errors);
    } else {
      getQuote(profile, true);
      initializeTravellerForms(profile.noOfAdult, profile.noOfChild);
    }
  }

  _chooseYourCover() {
    return (
      <div id="typeOfCover">
        <Row>
          <Col xs={6}>
            <RadioButton name="singleTrip"
              labelName={I18n.t('labels.singleTrip')}
              target={this.props.profile.typeOfCover}
              update={() => this.props.updateProfile('typeOfCover', 'singleTrip')}
            />
          </Col>
          <Col xs={6}>
            <RadioButton name="multiTrip"
              labelName={I18n.t('labels.annualTrip')}
              target={this.props.profile.typeOfCover}
              update={() => this.props.updateProfile('typeOfCover', 'multiTrip')}
            />
          </Col>
        </Row>
        <div className="error-text">{this.props.profile.errors.typeOfCover}</div>
      </div>
    );
  }

  _typeOfPlan() {
    return (
      <div id="typeOfPlan">
        <Row>
          <Col xs={6}>
            <RadioButton name="individual"
              labelName={I18n.t('labels.individual')}
              target={this.props.profile.typeOfPlan}
              update={() => {
                this.props.updateProfile('typeOfPlan', 'individual');
                this.props.updateProfile('noOfChild', undefined);
              }}
            />
          </Col>
          <Col xs={6}>
            <RadioButton name="family"
              labelName={I18n.t('labels.family')}
              target={this.props.profile.typeOfPlan}
              update={() => this.props.updateProfile('typeOfPlan', 'family')}
            />
          </Col>
        </Row>
        <div className="error-text">{this.props.profile.errors.typeOfPlan}</div>
      </div>
    );
  }

  _travelRegion() {
    return (
      <FormGroup id="region">
        <Select
          name="form-field-name"
          value={this.props.profile.region}
          options={RULES.TRAVEL_DESTINATIONS}
          onChange={(val) => this.props.updateProfile('region', val.value)}
          placeholder={I18n.t('labels.destination')}
          clearable={false}
        />
        <div className="error-text">{this.props.profile.errors.region}</div>
      </FormGroup>
    );
  }

  _numberOfAdult() {
    if (this.props.profile.typeOfPlan === 'individual') {
      const options = getArrayFromNumber(RULES.TRAVEL_INSURANCE.NUM_OF_ADULT_INDIVIDUAL, true);

      return (
        <FormGroup id="noOfAdult">
          <Select
            name="adult"
            value={this.props.profile.noOfAdult}
            options={options}
            onChange={(val) => this.props.updateProfile('noOfAdult', val.value)}
            placeholder={I18n.t('labels.adult')}
            clearable={false}
          />
          <div className="error-text">{this.props.profile.errors.noOfAdult}</div>
        </FormGroup>
      );
    }

    if(this.props.profile.typeOfPlan === 'family') {
      const options = getArrayFromNumber(RULES.TRAVEL_INSURANCE.NUM_OF_ADULT_FAMILY, true);

      return (
        <FormGroup id="noOfAdult">
          <Select
            name="adult"
            value={this.props.profile.noOfAdult}
            options={options}
            onChange={(val) => this.props.updateProfile('noOfAdult', val.value)}
            placeholder={I18n.t('labels.adult')}
            clearable={false}
          />
          <div className="error-text">{this.props.profile.errors.noOfAdult}</div>
        </FormGroup>
      );
    }

    return null;
  }

  _numberOfChild() {
    if (this.props.profile.typeOfPlan === 'family') {
      const options = getArrayFromNumber(RULES.TRAVEL_INSURANCE.NUM_OF_CHILD_FAMILY);

      return (
        <FormGroup id="noOfChild">
          <Select
            name="children"
            value={this.props.profile.noOfChild}
            options={options}
            onChange={(val) => this.props.updateProfile('noOfChild', val.value)}
            placeholder={I18n.t('labels.children')}
            clearable={false}
          />
          <div className="error-text">{this.props.profile.errors.noOfChild}</div>
        </FormGroup>
      );
    }

    return null;
  }

  _departureDate() {
    if(this.props.profile.typeOfCover === 'singleTrip') {
      const min = moment().add(RULES.TRAVEL_INSURANCE.DEPARTURE_MIN_DATE, 'day');
      const max = moment().add(RULES.TRAVEL_INSURANCE.DEPARTURE_MAX_DATE, 'day');

      return (
        <div id="departure">
          <CustomDatePicker
            selectedDate={this.props.profile.departure}
            labelName={I18n.t('labels.departureDate')}
            update={(value) => this.props.updateProfile('departure', value)}
            min={min}
            max={max}
          />
          <div className="error-text">{this.props.profile.errors.departure}</div>
        </div>
      );
    } else if(this.props.profile.typeOfCover === 'multiTrip') {
      const min = moment().add(RULES.TRAVEL_INSURANCE.START_MIN_DATE, 'day');
      const max = moment().add(RULES.TRAVEL_INSURANCE.START_MAX_DATE, 'day');

      return (
        <div id="startDate">
          <CustomDatePicker
            selectedDate={this.props.profile.startDate}
            labelName={I18n.t('labels.startDate')}
            update={(value) => {
              this.props.updateProfile('startDate', value);
              this.props.updateProfile('endDate', moment(value).add(RULES.TRAVEL_INSURANCE.YEAR_LENGTH, 'year'));
            }}
            min={min}
            max={max}
          />
          <div className="error-text">{this.props.profile.errors.startDate}</div>
        </div>
      );
    } else {
      return null;
    }
  }

  _arrivalDate() {
    if(this.props.profile.typeOfCover === 'singleTrip') {
      const min = moment().add(RULES.TRAVEL_INSURANCE.ARRIVAL_MIN_DATE, 'day');
      const max = moment().add(RULES.TRAVEL_INSURANCE.ARRIVAL_MAX_DATE, 'day');

      return (
        <div id="arrival">
          <CustomDatePicker
            selectedDate={this.props.profile.arrival}
            labelName={I18n.t('labels.arrivalDate')}
            update={(value) => this.props.updateProfile('arrival', value)}
            min={min}
            max={max}
          />
          <div className="error-text">{this.props.profile.errors.arrival}</div>
        </div>
      );
    } else if(this.props.profile.typeOfCover === 'multiTrip') {
      return (
        <div id="endDate">
          <CustomDatePicker
            selectedDate={this.props.profile.endDate}
            labelName={I18n.t('labels.endDate')}
            disabled={true}
          />
          <div className="error-text">{this.props.profile.errors.endDate}</div>
        </div>
      );
    } else {
      return null;
    }
  }

  _quoteButton() {
    return (
      <button className="btn btn-axa" onClick={this._onGetQuote}>{I18n.t('buttons.getQuote')}</button>
    );
  }

  render() {
    if (this.props.quote.isLoading) {
      return <Loader />;
    } else {
      return (
        <div className="home">
          <Container>
            <div className="form">
              <Row>
                <Col xs={12} style={{ textAlign: 'center' }}>
                  <span className="home_header">{I18n.t('titles.yourTravelInformation')}</span>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12}>
                  <span className="home_subtitle">{I18n.t('labels.typeOfTravel')}</span>
                  {this._chooseYourCover()}
                  <div className="spacer-down"></div>
                  <Row>
                    <Col xs={6} sm={6}>
                      {this._departureDate()}
                    </Col>
                    <Col xs={6} sm={6}>
                      {this._arrivalDate()}
                    </Col>
                  </Row>
                </Col>
                <Col xs={12} sm={12}>
                  <span className="home_subtitle-2">{I18n.t('labels.whereToTravel')}</span>
                  {this._travelRegion()}
                </Col>
                <Col xs={12} sm={12} className="box-s3">
                  <span className="home_subtitle-2">{I18n.t('labels.whoTravel')}</span>
                  {this._typeOfPlan()}
                  <div className="spacer-down"></div>
                  <Row>
                    <Col xs={6}>
                      {this._numberOfAdult()}
                    </Col>
                    <Col xs={6}>
                      {this._numberOfChild()}
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row style={{ textAlign: 'right', marginTop: '20px' }}>
                <Col xs={12}>
                  {this._quoteButton()}
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      );
    }
  }
}

TravelInsurancePage.propTypes = {
  quote: PropTypes.object,
  getQuote: PropTypes.func,
  profile: PropTypes.object,
  content: PropTypes.object,
  plans: PropTypes.array,
  location: PropTypes.object,
  i18n: PropTypes.object,
  updateProfile: PropTypes.func,
  updateAll: PropTypes.func,
  getProfileValidationError: PropTypes.func,
  initializeTravellerForms: PropTypes.func,
  updateContent: PropTypes.func,
  updateReference: PropTypes.func
};

function mapStateToProps({ quote, profile, plans, i18n }) {
  return {
    quote,
    profile,
    plans,
    i18n
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getQuote,
    updateProfile,
    updateAll,
    getProfileValidationError,
    initializeTravellerForms
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelInsurancePage);
