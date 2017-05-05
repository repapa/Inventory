import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { authenticate } from '../../actions/loginActions';
import { Link } from 'react-router';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this._onChange = this._onChange.bind(this);
        this._authenticate = this._authenticate.bind(this);
    }

    _authenticate(e){
        e.preventDefault();
        const credential = {
            username: this.state.username,
            password: this.state.password
        };
        authenticate(credential);
    }

    _onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="container center-align">
                <div className="row login-title">
                    <div className="col-md-12 text-center">
                        Login
                    </div>
                </div>
                <div className="row loginForm">
                    <div className="col-md-12">
                        <form role="form">
                            <div className="form-group">
                                <input type="text" className="form-control" 
                                    id="username" placeholder="Email / Username"
                                    value={this.state.username} name="username"
                                    onChange={this._onChange}
                                />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control"
                                    id="password" placeholder="Password"
                                    value={this.state.password} name="password"
                                    onChange={this._onChange}
                                />
                            </div>
                            <button onClick={this._authenticate} className="btn btn-default loginBtn">
                                Login
                            </button>
                            <div className="form-group text-center forgotPass-signUp">
                                <div className="col-md-6">
                                    <a href="#">Forgot Password</a>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/sign-up">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;