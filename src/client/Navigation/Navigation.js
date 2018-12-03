import React, { Component } from 'react';

import Authentification from './Authentification';
import TabBarNavigation from './TabBarNavigation';

import { connect } from 'react-redux';

class Navigation extends Component {
    
    render() {
        // console.log(this.props)
        // return ( this.props.AuthenticationReducer.isLogin !== null ? <TabBarNavigation /> : <Authentification /> )
        return ( <TabBarNavigation /> )
    }
}

const mapStateToProps = (state) => { 
    return state;
}

export default connect(mapStateToProps)(Navigation)