import React, { Component, PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';
import _ from 'lodash';
import validator from 'validator';
import { I18n } from 'react-redux-i18n';

import Toastr from '../../components/Toastr/Toastr';

class ContactForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sender: props.sender || '',
      title: props.title || '',
      comment: props.comment || '',
      isSending: false,
      toastr: {
        show: false,
        title: '',
        body: '',
        type: 'success'
      }
    };
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

  _sendEmail() {
    const details = Object.assign({}, this.state);

    if (this._isInvalid(details)) {
      return this._setToastr(true, '', 'Please fill in required fields', 'danger');
    }

    this.setState({
      isSending: true
    });

    this.props.sendEmail(details)
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

  _isInvalid(details) {
    return !(_.isString(details.title) && _.isString(details.sender) && validator.isEmail(details.sender));
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
        <label>{I18n.t('labels.orSendRequest')}</label>
        <FormControl type="text" onChange={(ev) => this._onChange('sender', ev)} value={this.state.fromEmail} placeholder={I18n.t('placeHolders.yourEmail')} />
        <FormControl type="text" onChange={(ev) => this._onChange('title', ev)} value={this.state.title} />
        <FormControl componentClass="textarea" onChange={(ev) => this._onChange('comment', ev)} value={this.state.comment} placeholder={I18n.t('placeHolders.optionalComment')} />
        <button className="btn btn-axa" onClick={() => this._sendEmail()} disabled={this.state.isSending}>{I18n.t('buttons.send')}</button>
      </div>
    );
  }
}

ContactForm.propTypes = {
  title: PropTypes.string,
  sender: PropTypes.string,
  comment: PropTypes.string,
  sendEmail: PropTypes.func,
  isInvalid: PropTypes.func
};

export default ContactForm;
