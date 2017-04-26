import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import validator from 'validator';
import { I18n } from 'react-redux-i18n';

import Toastr from '../../components/Toastr/Toastr';
import * as utils from '../../lib/util';

class SendQuoteForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      isSending: false,
      toastr: {
        show: false,
        title: '',
        body: '',
        type: 'success'
      }
    };
  }

  _isInvalid(details) {
    return !(_.isString(details.email) && _.isString(details.encodedQuote) && validator.isEmail(details.email));
  }

  _setToastr(isShow = false, title = '', body = '', type = 'success') {
    this.setState({
      toastr: {
        show: isShow,
        title: title,
        body: body,
        type: type
      }
    });

    setTimeout(() => this._resetToast(), 5000);
  }

  _resetToast() {
    this.setState({
      toastr: {
        show: false,
        title: '',
        body: '',
        type: 'success'
      }
    });
  }

  // encode to [profileData, selectionData]
  _getEncodedQuote(profile, selection) {
    return utils.encode(`[${JSON.stringify(profile)}, ${JSON.stringify(selection)}]`);
  }

  _sendEmail() {
    const details = Object.assign({}, this.state);
    const { profile, selection, sendEmail } = this.props;

    if (!profile || !selection) {
      return;
    }

    // generate encoded Quote
    details.encodedQuote = this._getEncodedQuote(profile, selection);
    // validation
    if (this._isInvalid(details)) {
      return this._setToastr(true, '', 'Please fill in required fields', 'danger');
    }

    // disable submit button
    this.setState({
      isSending: true
    });

    sendEmail(details)
    .then(() => {
      this._setToastr(true, '', I18n.t('messages.sendEmailSuccess'), 'success');
    }).catch(() => {
      this._setToastr(true, '', I18n.t('messages.sendEmailFail'), 'danger');
    }).finally(() => {
      this.setState({
        isSending: false
      });
    });
  }

  _onChange(key, ev) {
    this.setState({
      [key]: ev.target.value
    });
  }

  render() {
    const { toastr } = this.state;

    return (
      <div>
        <Toastr isShow={toastr.show} title={toastr.title} body={toastr.body} type={toastr.type} />
        <div className="input-group">
            <input type="text" className="form-control" onChange={(ev) => this._onChange('email', ev)} value={this.state.email} placeholder="Send quote to your Email" />
            <span className="input-group-btn">
                <button className="btn btn-axa" type="button" onClick={() => this._sendEmail()} disabled={this.state.isSending}>
                    Send
                </button>
            </span>
        </div>
      </div>
    );
  }
}

SendQuoteForm.propTypes = {
  profile: PropTypes.object,
  selection: PropTypes.object,
  sendEmail: PropTypes.func
};

export default SendQuoteForm;
