import React, { PropTypes } from 'react';
import { Panel, ButtonToolbar } from 'react-bootstrap';

import { getSelectedAddOns } from '../../selectors/plansSelectors';
import { getDestination, formatCurrency } from '../../lib/util';
import { I18n } from 'react-redux-i18n';

const TripSummary = ({ profile, plan, onBack, onNext, nextLabel, backLabel, disableNext, agreements, hasButtons = true, orderReferenceNumber, currency }) => {
  return (
    <Panel className="trip-summary">
      {orderReferenceNumber && (
        <div>
          <h5>
            <span className="axa-label">
              Order Reference: {orderReferenceNumber}
            </span>
          </h5>
          <hr />
        </div>
      )}

      <h5>
        {I18n.t('titles.tripSummary')}
      </h5>
      <p>
        {I18n.t('labels.region')}: {getDestination(profile.region)}
      </p>
      <p>
        {I18n.t('labels.departure')}: {profile.departure}
      </p>
      <p>
        {I18n.t('labels.return')}: {profile.arrival}
      </p>
      <h6>
        {I18n.t('labels.plan')}
      </h6>
      <p>
        {plan.planName}
      </p>
      <h6>
        {I18n.t('labels.addOns')}
      </h6>
      {
        getSelectedAddOns(plan).map(addOn => <li key={addOn.addOnId}>{addOn.addOnName}</li>)
      }
      <br/>
      <h6>
        {I18n.t('labels.total')}: {formatCurrency(currency, plan.totalFee)}
      </h6>
      <hr />
      {agreements}

      {hasButtons &&
      <ButtonToolbar>
        <hr />        
        <button className="btn btn-back" onClick={onBack} >{backLabel}</button>
        {
          disableNext ?
            <button className="btn btn-axa" disabled>{nextLabel}</button> :
            <button className="btn btn-axa" onClick={onNext}>{nextLabel}</button>
        }
      </ButtonToolbar>
      }
    </Panel>
  );
};

TripSummary.propTypes = {
  profile: PropTypes.object,
  plan: PropTypes.object,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
  backLabel: PropTypes.string,
  disableNext: PropTypes.bool,
  agreements: PropTypes.object,
  hasButtons: PropTypes.bool,
  orderReferenceNumber: PropTypes.string,
  currency: PropTypes.string
};

export default TripSummary;
