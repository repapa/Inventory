import React, { Component } from 'react';
import { connect } from 'react-redux';

class TestPage extends Component {

    render() {
        return (
            <div>
                Testing lang po
            </div>
        );
    }
}

export default connect()(TestPage);