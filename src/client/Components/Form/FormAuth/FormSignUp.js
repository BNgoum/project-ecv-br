import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import {requestRegister} from '../../../Store/Reducers/User/action';

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

    render() {
        return (
            <View style={ styles.wrapperInscription }>
                <Text style={ styles.title }>Inscription</Text>

                { this.props.state.AuthenticationReducer.auth_inscription_not_validated === "" ? null : <Text style={styles.textSignUpSuccess}>{this.props.state.AuthenticationReducer.auth_inscription_not_validated}</Text> }

                <TextInput 
                    style={styles.inputText}
                    onChangeText={(pseudo) => { this.setState({pseudo: pseudo}); }}
                    placeholder="Saisissez votre pseudo..."/>

                <TextInput 
                    style={styles.inputText}
                    onChangeText={(firstName) => { this.setState({firstName: firstName}); }}
                    placeholder="Saisissez votre prénom..."/>

                <TextInput 
                    style={styles.inputText}
                    onChangeText={(lastName) => { this.setState({lastName: lastName}); }}
                    placeholder="Saisissez votre nom..."/>

                <TextInput 
                    style={styles.inputText}
                    onChangeText={(email) => { this.setState({email: email}); }}
                    placeholder="Saisissez votre adresse email..."/>

                <TextInput 
                    style={styles.inputText}
                    onChangeText={(password) => { this.setState({password: password}); }}
                    placeholder="Saisissez votre mot de passe..."
                    secureTextEntry={this.state.isSecureTextEntry}/>

                { this.state.isEmpty ? <Text>Tous les champs doivent être remplis.</Text> : null }
                { this.props.state.AuthenticationReducer.auth_message_error
                    ?
                        <Text>{this.props.state.AuthenticationReducer.auth_message_error}</Text> 
                    :
                        null
                }

                <TouchableOpacity onPress={this.checkInputNotBlank} style={styles.buttonValidate} title="Valider"><Text style={styles.textValidate}>Valider</Text></TouchableOpacity>

                <View style={ styles.bar }></View>

                <Button title="Déjà inscrit ?" style={ styles.link } onPress={() => this.props.navigation.navigate('Connexion')} />
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
        marginBottom: 20
    },
    bar: {
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        marginTop: 16,
        marginBottom: 32,
        marginLeft: 32,
        marginRight: 32,
    },
    link: {
        color: '#0000AA',
        alignSelf: 'center'
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