import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { requestUserInformation } from '../../Store/Reducers/User/action';
import { acceptedRequest } from '../../Store/Reducers/Friends/action'

const jwtDecode = require('jwt-decode');
import { connect } from 'react-redux';

import TextBold from '../Style/TextBold';
import TextRegular from '../Style/TextRegular';
import { AntDesign } from '@expo/vector-icons';

import { Check } from '../../Images/icons';

class FriendRecipient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idUserA: "",
            iduserB: "",
            isAccepted: false
        }
    }

    acceptedRequest = () => {
        return new Promise((resolve, reject) => {
            // On récupère les info du user qui accepte la demande d'amis (current user)
            const token = this.props.state.AuthenticationReducer.isLogin;
            const decoded = jwtDecode(token);

            resolve(requestUserInformation(decoded.email))
        })
        .then((currentUser) => { acceptedRequest(currentUser._id, this.props.data._id); })
        .then(() => {
            let recipients = this.props.state.FriendReducer.recipient;
            let index = recipients.indexOf(this.props.data);

            if ( index > -1 ) { recipients.splice(index, 1); }

            const actionDeleteRecipient = { type: "DELETE_RECIPIENT", value: recipients }
            this.props.dispatch(actionDeleteRecipient);

            const actionAddAccepted = { type: "ADD_ACCEPTED", value: this.props.data }
            this.props.dispatch(actionAddAccepted);
        })
        .catch((error => console.log('Erreur lors de la requete d\'ajout d\'amis : ', error)))
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.avatar }>
                    <AntDesign name="user" size={32} color="black" />
                </View>
                <View style={ styles.wrapperText }>
                    <TextBold style={styles.pseudo} >{ this.props.data.pseudo }</TextBold>
                    <TextRegular style={styles.sousTexte} >0 Bet Room joué ensemble</TextRegular>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.acceptedRequest}><Check style={ styles.icon } /></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        borderRadius: 4,
        backgroundColor: '#242647',
        paddingHorizontal: 20,
        paddingVertical: 12 
    },
    pseudo: {
        fontSize: 16
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginRight: 20
    },
    wrapperText: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    sousTexte: {
        fontSize: 12
    },
    button: {
        position: 'absolute',
        right: 20,
        width: 32,
        height: 32
    },
    icon: {
        width: '100%',
        height: '100%'
    }
})

const mapStateToProps = (state) => { 
    return {state: state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRecipient)