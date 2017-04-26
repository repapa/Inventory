import React, { PropTypes } from 'react';

import { I18n } from 'react-redux-i18n';
import { formatCurrency } from '../../lib/util';

const ComparisionTable = ({ content, i18n, plans, onItemSelect, currency }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-offset-4 col-sm-8">
          <div className="row">
            {
              plans.map((plan, idx) => (
                <div className={`col-xs-${12 / plans.length} my_planHeader my_plan${idx + 1}`} key={plan.planId}>
                  <div className="my_planTitle">{plan.planName}</div>
                  <div className="my_planPrice">{formatCurrency(currency, plan.totalFee)}</div>
                  {
                    plan.selected ?
                      <button type="button" className="btn btn-axa" disabled>{I18n.t('buttons.selected')}</button> :
                      <button type="button" className="btn btn-axa" onClick={() => onItemSelect(plans, plan)}>{I18n.t('buttons.select')}</button>
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {
        content.contento.coverages[i18n.locale].map((coverage, idx) => (
          <div className="row my_featureRow" key={coverage.id}>
            <div className="col-xs-12 col-sm-4 my_feature">
              {coverage.value}
            </div>
            <div className="col-xs-12 col-sm-8">
              <div className="row">
                {
                  plans.map((plan, pidx) => (
                    <div className={`col-xs-${12 / plans.length} col-sm-${12 / plans.length} my_planFeature my_plan${pidx + 1}`} key={plan.planId}>
                      {content.contento[plan.planId][i18n.locale][currency].coverages[idx].value}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

ComparisionTable.propTypes = {
  content: PropTypes.object,
  i18n: PropTypes.object,
  plans: PropTypes.array,
  onItemSelect: PropTypes.func,
  currency: PropTypes.string
};

export default ComparisionTable;
