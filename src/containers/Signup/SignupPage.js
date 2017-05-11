import React, { Component } from 'react';
import UserForm from '../../components/UserForm/UserForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

class SignUpPage extends Component {

  _onSubmit(e) {
    e.preventDefault();
    alert('testing _onSubmit');
  }

  render() {
    return (
      // <UserForm handleSubmit={this._onSubmit.bind(this)}/>
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default SignUpPage;