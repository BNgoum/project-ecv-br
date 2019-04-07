import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormSignUp from '../../Components/Form/FormAuth/FormSignUp';
import { LinearGradient } from 'expo';

class Inscription extends Component {
    render() { return ( 
        <LinearGradient style={{ flex: 1 }} colors={['#10122d', '#385284', '#10122d']}>
            <FormSignUp navigation={this.props.navigation}/> 
        </LinearGradient>
    ) }
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