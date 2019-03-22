import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
const jwtDecode = require('jwt-decode');

import { requestUserInformation } from '../../Store/Reducers/User/action';
import Disconnect from './Disconnect';

class ProfilBis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPseudo: "",
            userLastName: "",
            userFirstName: ""
        }
    }

    componentDidMount() {
        this.getInformationsUser();
    }

    getInformationsUser = () => {
        const token = this.props.state.AuthenticationReducer.isLogin;

        const decoded = jwtDecode(token);

        return new Promise((resolve, reject) => {
            resolve(requestUserInformation(decoded.email))
        })
        .then((data) => {
            this.setState({
                userPseudo: data.pseudo,
                userFirstName: data.first_name,
                userLastName: data.last_name,
            })
        })
        .catch((error) => console.log('Erreur lors de la récupération des informations du user (profil.js) : ', error))
    }

    render() {
        return (
            <View style={styles.wrapperMatch}>
                <Text style={styles.title} >Mon Profil</Text>
                <Text style={styles.title} >{this.state.userPseudo}</Text>
                <Text style={styles.title} >{this.state.userLastName} {this.state.userFirstName}</Text>
                <Disconnect />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontSize: 22
    }
})

const mapStateToProps = (state) => { 
    return { state: state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilBis)