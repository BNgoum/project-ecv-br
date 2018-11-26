import React from 'react'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { StyleSheet, Image } from 'react-native'

import Home from '../Screens/Home'
import MatchsInComing from '../Screens/MatchsInComing'
import NewBetRoom from '../Screens/NewBetRoom'
import Classement from '../Screens/Classement'
import FriendsAndProfil from '../Screens/FriendsAndProfil'

const HomeStack = createStackNavigator({
    Home : {
        screen: Home,
        navigationOptions: {
            title: 'Accueil'
        }
    }
})

const MatchsInComingStack = createStackNavigator({
    Matchs : {
        screen: MatchsInComing,
        navigationOptions: {
            title: 'Matchs à venir'
        }
    }
})

const CreateBetRoomStack = createStackNavigator({
    NewBetRoom : {
        screen: NewBetRoom,
        navigationOptions: {
            title: 'Création d\'une Bet Room'
        }
    }
})

const ClassementStack = createStackNavigator({
    Classement : {
        screen: Classement,
        navigationOptions: {
            title: 'Classement'
        }
    }
})

const FriendsAndProfilStack = createStackNavigator({
    FriendsAndProfil : {
        screen: FriendsAndProfil,
        navigationOptions: {
            title: 'Profil / Amis'
        }
    }
})

const TabBarNavigator = createBottomTabNavigator({
    Accueil: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/home.png')}/>
            }
        }
    },
    Matchs: {
        screen: MatchsInComingStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/football.png')}/>
            }
        }
    },
    NewBR: {
        screen: CreateBetRoomStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/plus.png')}/>
            }
        }
    },
    Classement: {
        screen: ClassementStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/classement.png')}/>
            }
        }
    },
    FriendsAndProfil: {
        screen: FriendsAndProfilStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/profile.png')}/>
            }
        }
    }
    },
    {
        tabBarOptions : {
            activeBackgroundColor: '#DDD',
            inactiveBackgroundColor: '#FFF',
            showLabel: false,
            showIcon: true
        }
    }
)

const AppContainer = createAppContainer(TabBarNavigator);

const styles = StyleSheet.create({
    icon: {
      width: 30,
      height: 30
    }
})

export default AppContainer;