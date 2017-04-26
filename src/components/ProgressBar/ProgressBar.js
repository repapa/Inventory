import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Hidden, Visible } from 'react-grid-system';

import paths from '../../constants/routePaths';
import rules from '../../constants/rules';
import { I18n } from 'react-redux-i18n';

class ProgressBar extends Component {
  _getClass(idx) {
    if(!this.props.step.current || !idx || this.props.step.current < idx) {
      return 'disabled';
    } else if(this.props.step.current === idx) {
      return 'active';
    } else if(this.props.step.current < rules.MAX_STEP) {
      return 'completed';
    } else {
      return 'completed_b';
    }
  }

  _redirect(idx) {
    if(this.props.step && this.props.step.current < rules.MAX_STEP && this.props.step.current > idx) {
      if(idx === 1) {
        browserHistory.push(paths.INDEX);
      } else if(idx === 2) {
        browserHistory.push(paths.PLAN_SELECTION);
      } else if(idx === 3) {
        browserHistory.push(paths.CUSTOMER_DETAILS);
      } else if(idx === 4) {
        browserHistory.push(paths.PAYMENT_DETAILS);
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row text-center p-bar">
          <div className="col-xs-12">
            <div className="top-title">{I18n.t('titles.requestOffer')}</div>
            <div className="main-title">{I18n.t('titles.smartTraveller')}</div>
            <div className="sub-title">{I18n.t('subTitles.progressBar')}</div>
          </div>
          <div className="breadcrumb flat_travel">
            <Hidden xs>
              <a onClick={() => this._redirect(1)} className={this._getClass(1)}><i className="fa fa-plane"></i>{I18n.t('titles.travelInformation')}</a>
              <a onClick={() => this._redirect(2)} className={this._getClass(2)}><i className="fa fa-list-alt"></i>{I18n.t('titles.planSelection')}</a>
              <a onClick={() => this._redirect(3)} className={this._getClass(3)}><i className="fa fa-user"></i>{I18n.t('titles.customerDetails')}</a>
              <a onClick={() => this._redirect(4)} className={this._getClass(4)}><i className="fa fa-credit-card-alt"></i>{I18n.t('titles.payment')}</a>
            </Hidden>
            <Visible xs>
              <a onClick={() => this._redirect(1)} className={this._getClass(1)}><i className="fa fa-plane"></i></a>
              <a onClick={() => this._redirect(2)} className={this._getClass(2)}><i className="fa fa-list-alt"></i></a>
              <a onClick={() => this._redirect(3)} className={this._getClass(3)}><i className="fa fa-user"></i></a>
              <a onClick={() => this._redirect(4)} className={this._getClass(4)}><i className="fa fa-credit-card-alt"></i></a>
            </Visible>
          </div>
        </div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  step: PropTypes.object,
  i18n: PropTypes.object
};

function mapStateToProps({ step, i18n }) {
  return {
    step,
    i18n
  };
}

export default connect(
  mapStateToProps
)(ProgressBar);
