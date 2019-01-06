import React from 'react'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { StyleSheet, Image } from 'react-native'

import Home from '../Screens/Home'
import BetRoomDetails from '../Screens/BetRoom/BetRoomDetails'
import MatchsInComing from '../Screens/MatchsInComing'
import NewBetRoom from '../Screens/BetRoom/NewBetRoom'
import Rewards from '../Screens/BetRoom/Rewards'
import FriendsBetRoom from '../Screens/BetRoom/Friends'
import MatchsBetRoom from '../Screens/BetRoom/Match'
import Classement from '../Screens/Classement'
import FriendsAndProfil from '../Screens/FriendsAndProfil'

const HomeStack = createStackNavigator({
    Home : {
        screen: Home,
        navigationOptions: {
            title: 'Accueil'
        }
    },
    BetRoomDetails : {
        screen: BetRoomDetails,
        navigationOptions: {
            title: 'Détails de la Bet Room'
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
            title: 'Créer une Bet Room'
        }
    },
    Rewards: {
        screen: Rewards,
        navigationOptions: {
            title: 'Choix de la récompense'
        }
    },
    Friends: {
        screen: FriendsBetRoom,
        navigationOptions: {
            title: 'Choix des participants'
        }
    },
    MatchsBR: {
        screen: MatchsBetRoom,
        navigationOptions: {
            title: 'Choix des matchs'
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
                return <Image style={styles.icon} source={require('../Images/tab_bar/home.png')}/>
            }
        }
    },
    Matchs: {
        screen: MatchsInComingStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/tab_bar/football.png')}/>
            }
        }
    },
    NewBR: {
        screen: CreateBetRoomStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/tab_bar/plus.png')}/>
            }
        }
    },
    Classement: {
        screen: ClassementStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/tab_bar/classement.png')}/>
            }
        }
    },
    FriendsAndProfil: {
        screen: FriendsAndProfilStack,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image style={styles.icon} source={require('../Images/tab_bar/profile.png')}/>
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