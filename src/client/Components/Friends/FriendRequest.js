import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { requestUserInformation, requestUserInformationByPseudo } from '../../Store/Reducers/User/action';
import { friendRequest } from '../../Store/Reducers/Friends/action'

const jwtDecode = require('jwt-decode');
import { connect } from 'react-redux';

class FriendRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            idRecipient: ""
        }
    }

    sendRequest = () => {
        return new Promise((resolve, reject) => {
            if (this.state.pseudo === "" || this.state.pseudo === undefined) { reject((error) => console.log('Erreur le champs est vide de la saisie du pseudo : ', error)) }

            resolve(requestUserInformationByPseudo(this.state.pseudo));
        })
        .then( data => {
            if (data.type) { this.props.dispatch(data); } 
            else {
                return new Promise((resolve, reject) => {
                    this.setState({idRecipient: data._id})
                    // On donne en paramètre l'id du user qui emet la demande et en 2nd paramètres l'id du user qui reçoit la demande
                    resolve(friendRequest(this.props.user._id, data._id))
                })
                .then((action) => {
                    // On dispatch l'affichage du message de succès
                    this.props.dispatch(action)

                    // On remet à vide le state contenant un message d'erreur
                    const action2 = { type: "FOUND_USER_BY_PSEUDO", value: "" }
                    this.props.dispatch(action2);

                    // On ajoute le user recipient à la liste de pending
                    const actionAddPending = { type: "ADD_PENDING", value: data }
                    this.props.dispatch(actionAddPending);

                    // On clear l'input text
                    this.setState({ pseudo: '' })
                })
                .catch((error) => { console.log('Erreur lors du dispatch de la friendRequest : ', error)})
            }
        })
        .catch((error) => console.log('Erreur lors de la requête d\'amis (FriendRequest.js) : ', error))
    }

    render() {
        return (
            <View styles={styles.wrapperRecipientFriend}>
                <TextInput
                    placeholder="Entrez le pseudo de votre ami..."
                    onChangeText={(pseudo) => this.setState({pseudo})}
                    value={this.state.pseudo}
                    style={styles.inputPseudo} />

                { this.props.state.AuthenticationReducer.found_user_by_pseudo !== "" ?
                    <Text>{this.props.state.AuthenticationReducer.found_user_by_pseudo}</Text>
                  :
                    null
                }

                { this.props.state.FriendReducer.friend_request !== "" ?
                    <Text>{this.props.state.FriendReducer.friend_request}</Text>
                  :
                    null
                }

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.sendRequest}>
                    <Text>Envoyer</Text>
                </TouchableOpacity>
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
    inputPseudo: {
        display: 'flex',
        alignSelf: 'center',
        fontSize: 14,
        color: '#000',
        backgroundColor: '#fff',
        padding: 8,
        width: 250
    },
    button: {
        display: 'flex',
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 8,
        marginTop: 16
    },
    icon: {
        width: 32,
        height: 32,
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest)