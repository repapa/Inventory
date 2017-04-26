import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import routePaths from '../../constants/routePaths';
import { I18n } from 'react-redux-i18n';

class PaymentSuccess extends Component {

  render() {
    const { orderReference } = this.props;
    return (
      <Grid className="payment-confirmation-success">
        <center>
          <Row>
            <Col md={12}>
              <h1>
                {I18n.t('labels.congratulations')}
              </h1>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <div className="description">
                {I18n.t('messages.yourReferenceNumber')} {orderReference}
              </div>
            </Col>
          </Row>
          <br />
          <Row>
            <center>
              <form>
                <button
                  className="btn btn-axa"
                  onClick={() => browserHistory.push(routePaths.TRAVEL_INSURANCE)}
                  >
                  {I18n.t('titles.travelHomePage')}
                </button>
              </form>
            </center>
          </Row>
        </center>
      </Grid>
    );
  }
}

PaymentSuccess.propTypes = {
  orderReference: PropTypes.string
};

export default PaymentSuccess;
