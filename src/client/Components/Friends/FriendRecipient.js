import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { requestUserInformation, requestUserInformationByPseudo } from '../../Store/Reducers/User/action';
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
            // On récupère les info du user qui à fait la demande d'amis
            resolve(requestUserInformationByPseudo(this.props.data))
        })
        .then( data => {
            // On la set dans le state
            this.setState({ idUserB: data._id})
        })
        .then(() => {
            // On récupère les info du user qui accepte la demande d'amis (current user)
            const token = this.props.state;
            const decoded = jwtDecode(token);
            return requestUserInformation(decoded.email)
        })
        .then(data => {
            this.setState({
                idUserA: data._id
            })
        })
        .then(() => {
            // On effectue la requête d'acceptation d'amis
            return acceptedRequest(this.state.idUserA, this.state.idUserB)
        })
        .then( action => {
            this.props.dispatch(action);

            this.setState({isAccepted: true})
        })
        .catch((error => console.log('Erreur lors de la requete d\'ajout d\'amis : ', error)))
    }

    render() {
        return (
            <View>
                {
                    this.state.isAccepted ?
                    null
                    :
                    <View styles={styles.wrapperRecipientFriend}>
                        <Text style={styles.pseudo} >{this.props.data}</Text>
                        <TouchableOpacity style={styles.button} onPress={this.acceptedRequest}>
                            <Image style={styles.icon} source={require('../../Images/friends/check.png')} />
                        </TouchableOpacity>
                    </View>
                }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperRecipientFriend: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
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
    return {state: state.AuthenticationReducer.isLogin};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRecipient)