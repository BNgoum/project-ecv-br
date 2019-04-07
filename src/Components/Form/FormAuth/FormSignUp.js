import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import {requestRegister} from '../../../Store/Reducers/User/action';
import InputText from '../InputText';

import TextBold from '../../Style/TextBold';
import ButtonPrimary from '../../Style/ButtonPrimary';
import ButtonPrimaryText from '../../Style/ButtonPrimaryText';
import Link from '../../Style/Link';
import LinkText from '../../Style/LinkText';

class FormSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            isSecureTextEntry: true,
            isEmpty: false,
            isExist: false
        }
    }

    checkInputNotBlank = () => {
        if ( this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.password === "") {
            this.setState({ isEmpty: true })
        }
        else {
            this.setState({ isEmpty: false })
            
            return new Promise((resolve, reject) => {
                resolve(requestRegister(this.state.pseudo, this.state.firstName, this.state.lastName, this.state.email, this.state.password))
            })
            .then((action) => { this.props.dispatch(action) })
            .then(() => {
                // TODO: Check email confirmed
                const action = {
                    type: "IS_LOGIN", value: null
                }
                this.props.dispatch(action);
            })
            .catch((error) => { console.log('Erreur lors de la connexion : ', error); });
        }
    }

    handleOnChangeText = (type, value) => {
        switch (type) {
            case 'pseudo':
                this.setState({ pseudo: value })
                break;
            case 'email':
                this.setState({ email: value })
                break;
            case 'prenom':
                this.setState({ firstName: value })
                break;
            case 'nom':
                this.setState({ lastName: value })
                break;
            case 'password':
                this.setState({ password: value })
                break;
        }
    }

    render() {
        return (
            <View style={ styles.wrapperInscription }>
                <TextBold style={ styles.title }>Inscription</TextBold>

                { this.props.state.AuthenticationReducer.auth_inscription_not_validated === "" ? null : <Text style={styles.textSignUpSuccess}>{this.props.state.AuthenticationReducer.auth_inscription_not_validated}</Text> }

                <InputText 
                    placeholder="Pseudo"
                    sendPropsToParent={ this.handleOnChangeText }
                    typeOfInput="pseudo"
                />

                <InputText 
                    placeholder="Prénom"
                    sendPropsToParent={ this.handleOnChangeText }
                    typeOfInput="prenom"
                />

                <InputText 
                    placeholder="Nom"
                    sendPropsToParent={ this.handleOnChangeText }
                    typeOfInput="nom"
                />

                <InputText 
                    placeholder="E-mail"
                    sendPropsToParent={ this.handleOnChangeText }
                    typeOfInput="email"
                />

                <InputText 
                    placeholder="Mot de passe"
                    sendPropsToParent={ this.handleOnChangeText }
                    typeOfInput="password"
                    isPassword={true}
                />

                { this.state.isEmpty ? <Text>Tous les champs doivent être remplis.</Text> : null }
                { this.props.state.AuthenticationReducer.auth_message_error
                    ?
                        <Text>{this.props.state.AuthenticationReducer.auth_message_error}</Text> 
                    :
                        null
                }

                <ButtonPrimary onPress={this.checkInputNotBlank} style={styles.buttonValidate}>
                    <ButtonPrimaryText>S'inscrire</ButtonPrimaryText>
                </ButtonPrimary>

                <Link style={ styles.link } onPress={() => this.props.navigation.navigate('Connexion')}>
                    <LinkText style={ styles.linkText }>Déjà inscrit ?</LinkText>
                </Link>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperInscription: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 32,
        paddingRight: 32,
    },
    title: {
        fontSize: 23,
        alignSelf: 'center',
        marginBottom: 32
    },
    inputText: {
        backgroundColor: '#dedede',
        paddingTop: 15,
        paddingRight: 12,
        paddingBottom: 15,
        paddingLeft: 15,
        fontSize: 18,
        borderRadius: 50,
        marginBottom: 20
    },
    link: {
        alignSelf: 'center'
    },
    linkText: {
        fontSize: 14,
        paddingBottom: 5
    },
    buttonValidate: {
        marginTop: 16,
        marginBottom: 20,
        width: 156,
        alignSelf: 'center'
    },
    textValidate: {
        fontSize: 18,
    },
    textSignUpSuccess: {
        alignSelf: 'center',
        marginBottom: 16,
        color: "#05ff05"
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

export default connect(mapStateToProps, mapDispatchToProps)(FormSignUp)