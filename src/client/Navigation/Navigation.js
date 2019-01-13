import React, { Component } from 'react';

import Authentification from './Authentification';
import TabBarNavigation from './TabBarNavigation';

import { connect } from 'react-redux';

class Navigation extends Component {
    
    render() {
        const login = this.props.AuthenticationReducer.isLogin;
        return ( login !== null && login !== undefined ? <TabBarNavigation /> : <Authentification /> )
    }
}

const mapStateToProps = (state) => { 
    return state;
}

export default connect(mapStateToProps)(Navigation)