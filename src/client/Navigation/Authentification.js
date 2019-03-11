import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'

import Inscription from '../Screens/Authentification/Inscription';
import Connexion from '../Screens/Authentification/Connexion';

const ConnexionStack = createStackNavigator({
    Connexion: {
        screen: Connexion,
        navigationOptions: {
            title: 'BET ROOM',
            headerTitleStyle: {
                color: '#fff'
            },
             headerStyle: {
                backgroundColor: '#151830'
            },
             headerTintColor: {
                color: '#fff'
            }
        }
    }    
},
{
    cardStyle: { backgroundColor: '#151830' }
})

const InscriptionStack = createStackNavigator({
    Inscription: {
        screen: Inscription,
        navigationOptions: {
            title: 'BET ROOM',
            headerTitleStyle: {
                color: '#fff'
            },
             headerStyle: {
                backgroundColor: '#151830'
            },
             headerTintColor: {
                color: '#fff'
            }
        }
    }
},
{
    cardStyle: { backgroundColor: '#151830' }
})

export default createAppContainer(createSwitchNavigator(
    {
      Connexion: ConnexionStack,
      Inscription: InscriptionStack,
    }
));