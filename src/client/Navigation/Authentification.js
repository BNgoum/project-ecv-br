import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'

import Inscription from '../Screens/Authentification/Inscription';
import Connexion from '../Screens/Authentification/Connexion';

const ConnexionStack = createStackNavigator({
    Connexion: {
        screen: Connexion,
        navigationOptions: {
            title: 'Connexion'
        }
    },
    
})

const InscriptionStack = createStackNavigator({
    Inscription: {
        screen: Inscription,
        navigationOptions: {
            title: 'Inscription'
        }
    }
})

export default createAppContainer(createSwitchNavigator(
    {
      Connexion: ConnexionStack,
      Inscription: InscriptionStack,
    }
));