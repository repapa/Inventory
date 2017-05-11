import React, { Component } from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      timezone: ''
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onChange(e){
    this.setState({ [e.target.name] : e.target.value });
  }

  _onSubmit(e){
    e.preventDefault();
    console.log(this.state);
  }

  render(){
    const options = map(timezones, (val, key) => 
      <option key={val} value={key}>{key}</option>
    );
    return(
      <form onSubmit={this._onSubmit}>
        <h1>Sign-up</h1>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input type="text" name="username" className="form-control" value={this.state.username} onChange={this._onChange}/>
        </div>
        <div className="form-group">
          <label className="control-label">Email</label>
          <input type="text" name="email" className="form-control" value={this.state.email} onChange={this._onChange}/>
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input type="password" name="password" className="form-control" value={this.state.password} onChange={this._onChange}/>
        </div>
        <div className="form-group">
          <label className="control-label">Confirm Password</label>
          <input type="password" name="confirmPassword" className="form-control" value={this.state.confirmPassword} onChange={this._onChange}/>
        </div>
        <div className="form-group">
          <label className="control-label">Timezone</label>
          <select className="form-control" name="timezone" onChange={this._onChange} value={this.state.timezone}>
            <option value="" disabled>Choose your timezone</option>
            {options}
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-lg">Sign up</button>
        </div>
      </form>
    );
  }

}

export default SignUpForm;