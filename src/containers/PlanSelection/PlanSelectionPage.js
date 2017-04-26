import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Container, Row, Col } from 'react-grid-system';

import AddOn from '../../components/PlansSelection/AddOn';
import TripSummary from '../../components/Summary/TripSummary';
import NotFound from '../../components/NotFound/NotFound';
import ComparisionTable from '../../components/ComparisionTable/ComparisionTable';
import SendQuoteForm from '../../components/SendQuoteForm/SendQuoteForm';

import { selectPlan, selectAddOn, expandPlan } from '../../actions/planActions';
import { getSelectedPlan } from '../../selectors/plansSelectors';
import routePaths from '../../constants/routePaths';
import { formatCurrency } from '../../lib/util';
import { sendQuote } from '../../api/email';
import { I18n } from 'react-redux-i18n';

class PlanSelectionPage extends Component {

  _formatCurrency(value) {
    return formatCurrency(this.props.currency, value);
  }

  _onSelectPlan(plans, plan) {
    this.props.selectPlan(plans, plan);
  }

  _onExpandPlan(plans, plan) {
    this.props.expandPlan(plans, plan);
  }

  _onSelectAddOn(plan, addOn) {
    this.props.selectAddOn(plan, addOn);
  }

  _getPlans() {
    const { content, plans, currency, i18n } = this.props;



    if (content && plans && currency && i18n) {
      return (
        <div className="plans">
          <ComparisionTable content={content}
                            plans={plans}
                            currency={currency}
                            i18n={i18n}
                            onItemSelect={(plans, plan) => this._onSelectPlan(plans, plan)}
          />
        </div>
      );
    }
  }

  _getPreselectBox() {
    if (!this.props.selectedPlan.planId) {
      return (
                <Row>
                  <Col xs={12} sm={6}>
                    <div className="text-left">
                      <button
                        className="btn"
                        style={{ textTransform: 'none', marginBottom: '20px' }}
                        onClick={() => browserHistory.push(routePaths.TRAVEL_INSURANCE)}
                      >
                        {I18n.t('buttons.backToTravelInformation')}
                      </button>
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <SendQuoteForm  profile={this.props.profile}
                                    selection={this.props.selectedPlan}
                                    sendEmail={(details) => sendQuote(details)}
                    />
                  </Col>
                </Row>
              );
    }
  }

  _getAddOns() {
    const { selectedPlan } = this.props;

    if (selectedPlan.planId
      && selectedPlan.addOns
      && selectedPlan.addOns.length > 0) {
      const addOns = selectedPlan.addOns.map((addOn, i) => {
        return (
          <div key={addOn.addOnId}>
            <AddOn
              isSelected={addOn.selected}
              fee={this._formatCurrency(addOn.fee)}
              addOn={addOn}
              onSelect={this._onSelectAddOn.bind(this, selectedPlan, addOn)}
              />
            {selectedPlan.addOns[i + 1] && <hr />}
          </div>
        );
      });

      return (
        <div className="addon-wrapper">
          <div className="label-select">{I18n.t('titles.pleaseSelectAddons')}</div>
          <hr />
          {addOns}
        </div>
      );
    }
  }

  _getSummary() {
    const { profile, selectedPlan, currency } = this.props;
    if (selectedPlan.planId) {
      return (
        <div>
          <TripSummary
            profile={profile}
            plan={selectedPlan}
            currency={currency}
            onBack={() => browserHistory.push(routePaths.TRAVEL_INSURANCE)}
            onNext={() => browserHistory.push(routePaths.CUSTOMER_DETAILS)}
            nextLabel={I18n.t('buttons.next')}
            backLabel={I18n.t('buttons.backToTravelInformation')}
          />
          <SendQuoteForm  profile={this.props.profile}
                          selection={this.props.selectedPlan}
                          sendEmail={(details) => sendQuote(details)}
          />
        </div>
      );
    }
  }

  render() {
    if (!this.props.plans || this.props.plans.length === 0) {
      return <NotFound />;
    }

    return (
      <div className="plan-selection">
        <Container>
          <div className="label-select text-center">{I18n.t('titles.pleaseSelectPlan')}</div>
          <Row>
            {this._getPlans()}
          </Row>
          {this._getPreselectBox()}
          <Row>
            <Col xs={12} sm={12} md={8} lg={8}>
              {this._getAddOns()}
            </Col>
            <Col xs={12} sm={12} md={4} lg={4}>
              {this._getSummary()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

PlanSelectionPage.propTypes = {
  profile: PropTypes.object,
  quote: PropTypes.object,
  plans: PropTypes.array,
  currency: PropTypes.string,
  content: PropTypes.object,
  i18n: PropTypes.object,
  selectedPlan: PropTypes.object,
  selectPlan: PropTypes.func,
  selectAddOn: PropTypes.func,
  expandPlan: PropTypes.func
};

function mapStateToProps({ profile, quote, plans, selection, content, i18n, currency }) {
  return {
    profile,
    quote,
    plans,
    selection,
    selectedPlan: getSelectedPlan(plans),
    content,
    i18n,
    currency
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectPlan,
    selectAddOn,
    expandPlan
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlanSelectionPage);
