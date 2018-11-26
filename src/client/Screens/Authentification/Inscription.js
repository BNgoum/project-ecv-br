import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

import { connect } from 'react-redux';

class Inscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            isSecureTextEntry: true
        }
    }

    validateSignIn = () => {
        fetch('http://192.168.1.81:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            console.log('In Inscription : ', responseJson);

            if ( responseJson.data !== null ) {
                const action = {
                    type: "IS_LOGIN", value: true
                }
        
                this.props.dispatch(action);
            }
        })
        .catch(err => {
            console.log('Erreur lors de l\'inscription du user : ', err);
        });
    }


    render() {
        return (
            <View style={ styles.wrapperInscription }>
                <Text style={ styles.title }>Inscription</Text>
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

                <Button onPress={this.validateSignIn} title="Valider" />

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
    }
})

const mapStateToProps = (state) => { 
    return { state: state.isLogin }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inscription)