import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormLogin from '../../Components/Form/FormAuth/FormLogin'

class Connexion extends Component {
    render() { return ( <FormLogin navigation={this.props.navigation}/> ) }
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