import React, { Component, PropTypes } from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import { validateSignUpInputs } from '../../utils/validationUtils';
import TextFieldGroup from '../TextFieldGroup/TextFieldGroup';
import classnames from 'classnames';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      timezone: '',
      errors: {}
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _isValid() {
    const { errors, isValid } = validateSignUpInputs(this.state);

    if (!isValid) this.setState({ errors });

    return isValid;
  }

  _onSubmit(e) {
    e.preventDefault();
    if (this._isValid()) {
      this.setState({ errors: {} });
      this.props.signUpRequest(this.state);
    }
  }

  render() {
    const { errors } = this.state;
    const options = map(timezones, (val, key) =>
      <option key={val} value={key}>{key}</option>
    );
    return (
      <form onSubmit={this._onSubmit}>
        <h1>Sign-up</h1>

        <TextFieldGroup 
          name="username" value={this.state.username} 
          label="Username" type="text" _onChange={this._onChange} 
          error={errors.username}
        />

        <TextFieldGroup 
          name="email" value={this.state.email} 
          label="Email" type="text" _onChange={this._onChange} 
          error={errors.email}
        />

        <TextFieldGroup 
          name="password" value={this.state.password} 
          label="Password" type="text" _onChange={this._onChange} 
          error={errors.password}
        />

        <TextFieldGroup 
          name="confirmPassword" value={this.state.confirmPassword} 
          label="Confirm Password" type="text" _onChange={this._onChange} 
          error={errors.confirmPassword}
        />

        <div className={classnames("form-group", { "has-error": errors.timezone })}>
          <label className="control-label">Timezone</label>
          <select className="form-control" name="timezone" onChange={this._onChange} value={this.state.timezone}>
            <option value="" disabled>Choose your timezone</option>
            {options}
          </select>
          {errors.timezone && <span className="help-block">{errors.timezone}</span>}
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg">Sign up</button>
        </div>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  signUpRequest: PropTypes.func.isRequired
};

export default SignUpForm;