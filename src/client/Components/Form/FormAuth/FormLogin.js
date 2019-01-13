import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import {requestLogin} from '../../../Store/Reducers/User/action';

class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
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
            .then((data) => {
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

    render() {
        return (
            <View style={styles.wrapperInscription}>
                <Text style={ styles.title }>Connexion</Text>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(email) => { this.setState({email: email, isEmailBlank: false}); }}
                    placeholder="Saisissez votre adresse email..."/>

                { this.state.isEmailBlank ? <Text style={styles.textError}>Vous devez saisir votre email.</Text> : null }

                <TextInput 
                    style={styles.inputText}
                    onChangeText={(password) => { this.setState({password: password, isPasswordBlank: false}); }}
                    placeholder="Saisissez votre mot de passe..."
                    secureTextEntry={this.state.isSecureTextEntry}/>

                { this.props.state.AuthenticationReducer.auth_message_error !== "" ? <Text style={styles.textError}>{this.props.state.AuthenticationReducer.auth_message_error}</Text> : null }

                { this.state.isFound ? null : <Text style={styles.textError}>Email ou mot de passe incorrect.</Text> }
                { this.state.isPasswordBlank ? <Text style={styles.textError}>Vous devez saisir votre mot de passe.</Text> : null }

                <TouchableOpacity onPress={this.checkInputNotBlank} style={styles.buttonValidate} title="Valider"><Text style={styles.textValidate}>Valider</Text></TouchableOpacity>

                <View style={ styles.bar }></View>

                <Button title="Pas encore membre ?" style={ styles.link } onPress={() => this.props.navigation.navigate('Inscription')} />
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
        fontSize: 28,
        fontWeight: 'bold',
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
    bar: {
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginTop: 16,
        marginBottom: 32,
        marginLeft: 32,
        marginRight: 32,
    },
    buttonValidate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
        padding: 16,
        backgroundColor: "#DDD",
    },
    textValidate: {
        fontSize: 18,
    },
    textError: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#f10505'
    },
    link: {
        color: '#0000AA',
        alignSelf: 'center'
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