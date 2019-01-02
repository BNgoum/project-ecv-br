import React, { Component } from 'react';

import Authentification from './Authentification';
import TabBarNavigation from './TabBarNavigation';

import { connect } from 'react-redux';

class Navigation extends Component {
    
    render() {
        return ( this.props.AuthenticationReducer.isLogin !== null ? <TabBarNavigation /> : <Authentification /> )
    }
}

const mapStateToProps = (state) => { 
    return state;
}

export default connect(mapStateToProps)(Navigation)