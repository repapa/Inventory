import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkPaymentStatus } from '../../actions/paymentActions';

import * as status from '../../constants/status';
import Loader from '../../components/Loader/Loader';
import NotFound from '../../components/NotFound/NotFound';

import PaymentSuccess from '../../components/Payment/PaymentSuccess';
import PaymentPending from '../../components/Payment/PaymentPending';
import PaymentError from '../../components/Payment/PaymentError';

class PaymentConfirmationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderReference: props.order.referenceNumber,
      canGoBack: true
    };
  }

  componentWillMount() {
    const { order, params } = this.props;

    if (order && order.referenceNumber) {
      this.props.checkPaymentStatus(order.referenceNumber);
    }

    else if (params && params.orderReference) {
      this.props.checkPaymentStatus(params.orderReference);

      this.setState({
        orderReference: params.orderReference,
        canGoBack: false
      });
    }
  }

  _render() {
    const { order, payment, params } = this.props;

    if ((!order || !order.referenceNumber) && (!params || !params.orderReference)) {
      return <NotFound />;
    }

    else if (payment.isLoading) {
      return <Loader />;
    }

    else {
      switch(payment.status) {
        case status.payment.SUCCESS:
          return <PaymentSuccess orderReference={this.state.orderReference} />;

        case status.payment.PENDING:
          return <PaymentPending orderReference={this.state.orderReference} />;

        case status.payment.ERROR:
          return <PaymentError orderReference={this.state.orderReference} canGoBack={this.state.canGoBack} />;

        default:
          return <NotFound />;
      }
    }
  }

  render() {
    return (
      <div className="payment-confirmation">
        {this._render()}
      </div>
    );
  }
}

PaymentConfirmationPage.propTypes = {
  order: PropTypes.object,
  payment: PropTypes.object,
  params: PropTypes.object,
  checkPaymentStatus: PropTypes.func,
  i18n: PropTypes.object
};

function mapStateToProps({ order, payment, i18n }) {
  return {
    order,
    payment,
    checkPaymentStatus,
    i18n
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    checkPaymentStatus
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentConfirmationPage);
