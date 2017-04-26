import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import _ from 'lodash';

import NotFound from '../../components/NotFound/NotFound';
import TripSummary from '../../components/Summary/TripSummary';
import routePaths from '../../constants/routePaths';
import { getSelectedPlan } from '../../selectors/plansSelectors';

import PolicyHolderForm from './PolicyHolderForm';
import TravellerForm from './TravellerForm';
import CustomerSummaryPanel from '../../components/Summary/CustomerSummaryPanel';
import Agreement from '../../components/Agreement/Agreement';

import { goToNextForm, goToSelectedForm } from '../../actions/customerDetails/customerFormActions';
import { purchaseOrder } from '../../actions/orderActions';
import { acceptTermsAndConditions } from '../../actions/agreementsActions';
import { I18n } from 'react-redux-i18n';

class CustomerDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPurchasing: false
    };
  }

  _shouldDisplayForm() {
    return this.props.displayedFormIndex < this.props.formCount;
  }

  _onPurchase() {
    this.setState({ isPurchasing: true });
    const { profile, selectedPlan, travellers, policyHolder, agreements, purchaseOrder } = this.props;

    if (agreements.termsAndConditionsAccepted) {
      purchaseOrder(profile, selectedPlan, policyHolder, travellers);
    }
  }

  _onAcceptTermsAndConditions(e) {
    let accepted = e.target.checked;
    accepted = _.isUndefined(accepted) ? true: accepted;

    this.props.acceptTermsAndConditions(accepted);
  }

  _summary() {
    const { profile, selectedPlan, currency } = this.props;
    if (!selectedPlan.planId) {
      return null;
    }

    return (
      <TripSummary
        profile={profile}
        plan={selectedPlan}
        currency={currency}
        onBack={() => browserHistory.push(routePaths.PLAN_SELECTION)}
        onNext={this._onPurchase.bind(this)}
        backLabel={I18n.t('buttons.back')}
        nextLabel={I18n.t('buttons.next')}
        disableNext={this._shouldDisplayForm()}
        agreements={this._renderAgreement()}
      />
    );
  }

  _getForm(formIndex) {
    if(formIndex === 0) {
      return (
        <PolicyHolderForm
          goToNextForm={this.props.goToNextForm}
        />
      );
    } else {
      // The second form is the first traveller that is not a policy holder
      const travellerIndex = formIndex - 1;
      return (
        <TravellerForm
          key={travellerIndex}
          travellerIndex={travellerIndex}
          goToNextForm={this.props.goToNextForm}
        />
      );
    }
  }

  _renderActiveForm() {
    return this._shouldDisplayForm() ? this._getForm(this.props.displayedFormIndex) : null;
  }

  _renderCustomerSummary() {
    const customers = [this.props.policyHolder, ...this.props.travellers];

    const customerSummaryPanels = customers
      .map((customer, index) => (
        <CustomerSummaryPanel
          key={index}
          customer={customer}
          onEdit={this.props.goToSelectedForm.bind(null, index)}
          isPolicyHolder={index === 0}
          i18n={this.props.i18n}
        />
      ));

    return customerSummaryPanels
      .filter((customerPanel, index) => customers[index].isFilled);
  }

  _renderAgreement() {
    return (
      <Agreement
        onAccept={this._onAcceptTermsAndConditions.bind(this)}
        isAccepted={this.props.agreements.termsAndConditionsAccepted}
        isPurchasing={this.state.isPurchasing}
      />
    );
  }

  _renderNotFound() {
    return (
      <NotFound />
    );
  }

  render() {
    if (!this.props.selectedPlan.planId) {
      return this._renderNotFound();
    }

    return (
      <div className="customer-details">
        <Grid>
          <Row style={{ textAlign: 'center' }}>
            <h1 className="home_header">{I18n.t('titles.customerDetails')}</h1>
          </Row>
          <Row>
            <Col sm={8} lg={8}>
              <Row>
                <Col sm={12}>
                  {this._renderActiveForm()}
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  {this._renderCustomerSummary()}
                </Col>
              </Row>
            </Col>
            <Col sm={4} lg={4}>
              {this._summary()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

CustomerDetailsPage.propTypes = {
  formCount: PropTypes.number,
  selectedPlan: PropTypes.object,
  policyHolder: PropTypes.object,
  travellers: PropTypes.array,
  profile: PropTypes.object,
  i18n: PropTypes.object,
  goToNextForm: PropTypes.func,
  goToSelectedForm: PropTypes.func,
  displayedFormIndex: PropTypes.number,
  filledFormIndex: PropTypes.number,
  purchaseOrder: PropTypes.func,
  agreements: PropTypes.object,
  currency: PropTypes.string,
  acceptTermsAndConditions: PropTypes.func
};

function mapStateToProps({ profile, plans, customerForm, policyHolder, travellers, agreements, currency, i18n }) {
  return {
    formCount: (+ profile.noOfAdult || 0) + (+ profile.noOfChild || 0),
    selectedPlan: getSelectedPlan(plans),
    filledFormIndex: customerForm.filledFormIndex,
    displayedFormIndex: customerForm.displayedFormIndex,
    profile,
    policyHolder,
    travellers,
    agreements,
    currency,
    i18n
  };
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    goToNextForm,
    goToSelectedForm,
    acceptTermsAndConditions,
    purchaseOrder
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetailsPage);
