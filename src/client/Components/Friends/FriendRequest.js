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
            idRecipient: "",
            isEmpty: false
        }
    }

    sendRequest = () => {
        return new Promise((resolve, reject) => {
            if (this.state.pseudo === "" || this.state.pseudo === undefined) { 
                this.setState({ isEmpty: true })
                reject((error) => console.log('Erreur le champs est vide de la saisie du pseudo : ', error)) }
            else {
                resolve(requestUserInformationByPseudo(this.state.pseudo));
            }
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
            <View styles={styles.wrapperRequestFriend}>
                <View style={ styles.wrapperInput } >
                    <TextInput
                        placeholder="Entrez le pseudo de votre ami..."
                        onChangeText={(pseudo) => {
                            this.setState({pseudo, isEmpty: false});
                            const action = { type: "FOUND_USER_BY_PSEUDO", value: "" }
                            this.props.dispatch(action);
                        }}
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

                    { this.state.isEmpty ?
                        <Text>Le champs de saisi est vide.</Text>
                    :
                        null
                    }
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.sendRequest}>
                    <Text style={ styles.textButton }>Envoyer</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperInput: {
        alignSelf: 'center'
    },
    inputPseudo: {
        fontSize: 14,
        color: '#000',
        backgroundColor: '#fff',
        padding: 8,
        width: 270,
        marginBottom: 6
    },
    button: {
        backgroundColor: '#fff',
        padding: 8,
        marginTop: 16,
        width: 80,
        display: 'flex',
        alignSelf: 'center'
    },
    textButton: {
        textAlign: 'center'
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