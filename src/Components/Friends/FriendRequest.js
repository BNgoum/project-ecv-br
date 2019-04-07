import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { requestUserInformationByPseudo } from '../../Store/Reducers/User/action';
import { friendRequest } from '../../Store/Reducers/Friends/action'

import { connect } from 'react-redux';

import InputText from '../Form/InputText';
import ButtonPrimary from '../Style/ButtonPrimary';
import ButtonPrimaryText from '../Style/ButtonPrimaryText';
import TextRegular from '../Style/TextRegular';

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
                    resolve(friendRequest(this.props.state.AuthenticationReducer.userInfo._id, data._id))
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

    handleOnChangeText = (type, pseudo) => {
        this.setState({pseudo, isEmpty: false});
        const action = { type: "FOUND_USER_BY_PSEUDO", value: "" }
        this.props.dispatch(action);
    }

    render() {
        console.log('Pseudo : ', this.state.pseudo)
        return (
            <View styles={styles.container}>
                <View style={ styles.wrapperInput } >
                    <InputText 
                        placeholder="Tapez le pseudo d'un ami"
                        sendPropsToParent={ this.handleOnChangeText }
                        typeOfInput="pseudo"
                        value={this.state.pseudo}
                    />

                    { this.props.state.AuthenticationReducer.found_user_by_pseudo !== "" && <TextRegular>{this.props.state.AuthenticationReducer.found_user_by_pseudo}</TextRegular> }

                    { this.props.state.FriendReducer.friend_request !== "" && <TextRegular>{this.props.state.FriendReducer.friend_request}</TextRegular> }

                    { this.state.isEmpty && <TextRegular>Le champs de saisi est vide.</TextRegular> }
                </View>

                <ButtonPrimary
                    style={styles.button}
                    onPress={this.sendRequest}>
                    <ButtonPrimaryText style={ styles.textButton }>Rechercher</ButtonPrimaryText>
                </ButtonPrimary>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    wrapperInput: {
        // width: '50%'
        padding: 20
    },
    button: {
        width: 140,
        alignSelf: 'center'
        // backgroundColor: '#fff',
        // padding: 8,
        // marginTop: 16,
    },
    textButton: {
        // textAlign: 'center'
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