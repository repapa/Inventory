import React, { Component, PropTypes } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { I18n } from 'react-redux-i18n';

import routePaths from '../../constants/routePaths';
import ContactForm from '../../components/Contact/ContactForm';

import { sendPaymentDetails } from '../../api/email';

class PaymentError extends Component {
  render() {
    const { orderReference, canGoBack } = this.props;

    return (
      <div className="payment-error">
        <Grid>
          <Col xs={12} sm={6} smOffset={3} className="payment-error-form">
            <h1 className="text-center">
               {I18n.t('messages.paymentError')}
            </h1>
            <div className="description">
            {I18n.t('messages.yourReferenceNumber')} {orderReference}
            </div>
            <div>
              {I18n.t('messages.informPaymentFails')}
            </div>
            <div>
              <label>{I18n.t('messages.fixOptions')}</label>
            </div>
            <hr />
            {canGoBack && <div>
              <button className="btn btn-axa" style={{ width: '100%' }}
                  onClick={() => browserHistory.push(routePaths.PAYMENT_DETAILS)}>
                  {I18n.t('buttons.reviewPaymentInfo')}
              </button>
              <hr />
            </div>}
            <div>
                <label>{I18n.t('labels.orCallUs')}</label>
            </div>
            <hr />
              <ContactForm  title={`Payment Error - Order Reference: ${orderReference}`}
                            sendEmail={(details) => sendPaymentDetails(details)}
              />
          </Col>
        </Grid>
      </div>
    );
  }

}

PaymentError.propTypes = {
  orderReference: PropTypes.string,
  canGoBack: PropTypes.bool
};

export default PaymentError;
