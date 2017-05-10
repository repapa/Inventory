import React, { Component } from 'react';
import UserForm from '../../components/UserForm/UserForm';

class SignUpPage extends Component {

  _onSubmit(e) {
    e.preventDefault();
    alert('testing _onSubmit');
  }

  render() {
    return (
      <UserForm handleSubmit={this._onSubmit.bind(this)}/>
    );
  }
}

export default SignUpPage;