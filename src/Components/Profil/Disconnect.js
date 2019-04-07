import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { connect } from 'react-redux';


class Disconnect extends Component {
    constructor(props) {
        super(props);
    }

    disconnect = () => {
        const action = {
            type: "TO_DISCONNECT", value: null
        }

        return new Promise((resolve, reject) => {
            resolve(this.props.dispatch(action));
        }).then(() => this.props.navigation.navigate('Connexion'))
        .catch((err) => reject('Erreur lors de la déconnexion : ', err));
    }

    render() {
        return (
            <TouchableOpacity style={styles.buttonDisconnect} onPress={this.disconnect}>
                <Text style={styles.textDisconnect}>Se déconnecter</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonDisconnect: {
        backgroundColor: '#dedede',
        padding: 16,
        width: 200,
        alignSelf: 'center'
    },
    textDisconnect: {
        alignSelf: 'center',
        fontSize: 16
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

export default connect(mapStateToProps, mapDispatchToProps)(Disconnect)