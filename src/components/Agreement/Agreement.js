import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import TermsAndConditions from './TermsAndConditions';
import { I18n } from 'react-redux-i18n';

class Agreement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      termsAndConditionsShow: false
    };

    this.onTermsAndConditionsShow = this.onTermsAndConditionsShow.bind(this);
    this.onTermsAndConditionsClose = this.onTermsAndConditionsClose.bind(this);
  }

  onTermsAndConditionsShow() {
    this.setState({ termsAndConditionsShow: true });
  }

  onTermsAndConditionsClose() {
    this.setState({ termsAndConditionsShow: false });
  }

  render() {
    const { onAccept, isAccepted, isPurchasing } = this.props;
    
    return (
      <Col md={12} className="terms-and-conditions">
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={isAccepted && 'checked'}
              onClick={onAccept}
              />
            {I18n.t('messages.readAndAccept')} <a href="#" onClick={this.onTermsAndConditionsShow}>
              <u>{I18n.t('titles.termsAndConditions')}</u></a> {I18n.t('messages.ofThePolicy')}
          </label>
          {!isAccepted && isPurchasing &&
            <div className="terms-conditions-error-msg">
            {I18n.t('messages.acceptError')}
            </div>
          }
        </div>

        <TermsAndConditions
          isAccepted={isAccepted}
          show={this.state.termsAndConditionsShow}
          onAccept={onAccept}
          onHide={this.onTermsAndConditionsClose}
          />

        <hr />
      </Col>
    );
  }
}

Agreement.propTypes = {
  onAccept: PropTypes.func,
  isAccepted: PropTypes.bool,
  isPurchasing: PropTypes.bool,
  i18n: PropTypes.object
};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(mapStateToProps)(Agreement);