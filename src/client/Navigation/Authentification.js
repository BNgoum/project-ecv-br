import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation'

import Inscription from '../Screens/Authentification/Inscription';
import Connexion from '../Screens/Authentification/Connexion';

const AuthenticationStack = createStackNavigator({
    Connexion: {
        screen: Connexion,
        navigationOptions: {
            title: 'Connexion'
        }
    },
    Inscription: {
        screen: Inscription,
        navigationOptions: {
            title: 'Inscription'
        }
    }
})

const AppContainer = createAppContainer(AuthenticationStack);

export default AppContainer;
// export default class Authentification extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isInscriptionDisplay: true
//         }
//     }

//     handleChangeScreen = () => {
//         this.setState({
//             isInscriptionDisplay: !this.state.isInscriptionDisplay
//         })
//       }

//     render() {
//         return (
//             <View style={styles.wrapperAuth}>
//                 { this.state.isInscriptionDisplay ? <Inscription changeScreenAuthentication={this.handleChangeScreen} /> : <Connexion changeScreenAuthentication={this.handleChangeScreen} /> }
//             </View>
//         )
//     }
// }

const styles = StyleSheet.create({
    wrapperAuth: {
        display: 'flex',
        flex: 1,
    },
    
})