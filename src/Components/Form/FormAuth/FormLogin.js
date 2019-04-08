import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import {requestLogin} from '../../../Store/Reducers/User/action';

import TextBold from '../../Style/TextBold';
import TextRegular from '../../Style/TextRegular';
import ButtonPrimary from '../../Style/ButtonPrimary';
import ButtonPrimaryText from '../../Style/ButtonPrimaryText';
import Link from '../../Style/Link';
import LinkText from '../../Style/LinkText';

import InputText from '../InputText';

class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "Ben",
            password: "ben",
            isSecureTextEntry: true,
            isFound: true,
            isEmailBlank: false,
            isPasswordBlank: false
        }
    }

    checkInputNotBlank = () => {
        if ( this.state.email === "" && this.state.password === "" ) {
            this.setState({ isEmailBlank: true, isPasswordBlank: true })
        }
        else if ( this.state.email === "" ) { this.setState({ isEmailBlank: true }) }
        else if ( this.state.password === "" ) { this.setState({ isPasswordBlank: true }) }
        else {
            return new Promise((resolve, reject) => { resolve(requestLogin(this.state.email, this.state.password)) })
            .then(data => {
                const actionToken = {
                    type: "IS_LOGIN", value: data.token
                }
                this.props.dispatch(actionToken);

                const actionUser = {
                    type: "SET_USER_INFO", value: data.user
                }
                this.props.dispatch(actionUser);
            })
            .catch((error) => { console.log('Erreur lors de la connexion : ', error); });
        }
    }

    handleOnChangeText = (type, value) => {
        if ( type === "email") {
            this.setState({ email: value, isEmailBlank: false })
        } else {
            this.setState({ password: value, isPasswordBlank: false })
        }
    }

    render() {
        return (
            <View style={styles.wrapperInscription}>
                <TextBold style={ styles.title }>Connexion</TextBold>

                { this.state.isEmailBlank ? <Text style={styles.textError}>Vous devez saisir votre email.</Text> : null }

                <InputText 
                    placeholder="E-mail"
                    sendPropsToParent={ this.handleOnChangeText }
                    typeOfInput="email"
                    testvalue={this.state.email}
                />
                
                <InputText 
                    placeholder="Mot de passe"
                    sendPropsToParent={ this.handleOnChangeText }
                    isPassword={true}
                    typeOfInput="password"
                    testvalue={this.state.password}
                />

                { this.props.state.AuthenticationReducer.auth_message_error !== "" && <TextRegular style={styles.textError}>{this.props.state.AuthenticationReducer.auth_message_error}</TextRegular> }

                { !this.state.isFound && <TextRegular style={styles.textError}>Email ou mot de passe incorrect.</TextRegular> }
                { this.state.isPasswordBlank && <TextRegular style={styles.textError}>Vous devez saisir votre mot de passe.</TextRegular> }

                <ButtonPrimary onPress={this.checkInputNotBlank} style={styles.buttonValidate}>
                    <ButtonPrimaryText>Se connecter</ButtonPrimaryText>
                </ButtonPrimary>

                <Link style={ styles.link } onPress={() => this.props.navigation.navigate('Inscription')}>
                    <LinkText style={ styles.linkText }>Pas encore membre ?</LinkText>
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
        marginTop: 20
    },
    buttonValidate: {
        marginTop: 32,
        marginBottom: 20,
        width: 156,
        alignSelf: 'center'
    },
    textError: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#f10505'
    },
    link: {
        alignSelf: 'center'
    },
    linkText: {
        fontSize: 14,
        paddingBottom: 5
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

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)