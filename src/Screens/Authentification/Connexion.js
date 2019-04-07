import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormLogin from '../../Components/Form/FormAuth/FormLogin';
import { LinearGradient } from 'expo';

class Connexion extends Component {
    render() { return ( 
        <LinearGradient style={{ flex: 1 }} colors={['#10122d', '#385284', '#10122d']}>
            <FormLogin navigation={this.props.navigation}/>
        </LinearGradient>
    ) }
}

const mapStateToProps = (state) => { 
    return { state: state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Connexion)