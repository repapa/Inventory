import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Row, Col, Panel, Accordion, FormGroup } from 'react-bootstrap';

import { getSelectedPlan } from '../../selectors/plansSelectors';
import { payNow } from '../../actions/paymentActions';

import TextField from '../../components/TextField/TextField';
import TripSummary from '../../components/Summary/TripSummary';
import NotFound from '../../components/NotFound/NotFound';

import { I18n } from 'react-redux-i18n';

class PaymentDetailsPage extends Component {
  _onPayLater() {
    // to be discuss
  }

  _onSubmitPayNow() {
    const { order, payNow } = this.props;
    payNow(order.referenceNumber);
  }

  _summary() {
    const { profile, selectedPlan, order, currency } = this.props;
    if (!selectedPlan.planId) {
      return null;
    }

    return (
      <TripSummary
        profile={profile}
        plan={selectedPlan}
        hasButtons={false}
        orderReferenceNumber={order.referenceNumber}
        currency={currency}
        />
    );
  }

  _getPaymentCardForm() {
    return (
      <FormGroup>
        <Row>
          <Col md={6}>
            <TextField
              labelName={I18n.t('labels.cardHolderName')}
              />
          </Col>
          <Col md={6}>
            <TextField
              type="date"
              labelName={I18n.t('labels.expirationDate')}
              />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              type="number"
              labelName={I18n.t('labels.cardNumber')}
              />
          </Col>
          <Col md={6}>
            <TextField
              type="number"
              labelName={I18n.t('labels.cvv')}
              />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-right">
            <button className="btn btn-axa" onClick={() => this._onSubmitPayNow()}>
              {I18n.t('buttons.pay')}
            </button>
          </Col>
        </Row>
      </FormGroup>
    );
  }

  render() {
    if (Object.keys(this.props.selectedPlan) <= 0) {
      return <NotFound />;
    }

    return (
      <div className="payment-details">
        <Grid>
          <Row>
            <Col md={8} sm={12}>
              <Accordion>
                <Panel header={I18n.t('titles.payNow')} bsStyle="primary" eventKey="1">
                  <div>
                    {this._getPaymentCardForm()}
                  </div>
                </Panel>
                <Panel header={I18n.t('titles.payLater')} bsStyle="primary" eventKey="2">
                  {I18n.t('contents.payLater')}
                </Panel>
              </Accordion>
            </Col>
            <Col md={4} sm={12}>
              {this._summary()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

PaymentDetailsPage.propTypes = {
  order: PropTypes.object,
  profile: PropTypes.object,
  selectedPlan: PropTypes.object,
  payNow: PropTypes.func,
  currency: PropTypes.string
  
};

function mapStateToProps({ order, profile, plans, currency, i18n }) {
  return {
    order,
    profile,
    selectedPlan: getSelectedPlan(plans),
    currency,
    i18n
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    payNow
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDetailsPage);
