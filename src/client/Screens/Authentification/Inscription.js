import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormSignUp from '../../Components/Form/FormAuth/FormSignUp'

class Inscription extends Component {
    render() { return ( <FormSignUp navigation={this.props.navigation}/> ) }
}

const mapStateToProps = (state) => { 
    return { state: state.isLogin }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inscription)