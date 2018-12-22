import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { requestUserInformation, requestUserInformationById } from '../../Store/Reducers/User/action';
import { acceptedRequest } from '../../Store/Reducers/Friends/action'

const jwtDecode = require('jwt-decode');
import { connect } from 'react-redux';

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
            <View styles={styles.wrapperRecipientFriend}>
                <Text style={styles.pseudo} >{this.props.data.pseudo}</Text>
                <TouchableOpacity style={styles.button} onPress={this.acceptedRequest}>
                    <Image style={styles.icon} source={require('../../Images/friends/check.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperRecipientFriend: {
    },
    pseudo: {
        fontSize: 14,
    },
    button: {
        width: 32,
        height: 32
    },
    icon: {
        width: 32,
        height: 32,
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