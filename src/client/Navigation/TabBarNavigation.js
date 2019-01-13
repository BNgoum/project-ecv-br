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

import Icon from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';

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
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <IconEntypo name="home" size={33} color="#000"></IconEntypo>
                : <Image style={styles.icon} source={require('../Images/tab_bar/home.png')}/>
            )
        }
    },
    Matchs: {
        screen: MatchsInComingStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <Image style={styles.icon} source={require('../Images/tab_bar/football_focused.png')}/>
                : <Image style={styles.icon} source={require('../Images/tab_bar/football.png')}/>
            )
        }
    },
    NewBR: {
        screen: CreateBetRoomStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <Icon name="pluscircle" size={30} color="#000"></Icon>
                : <Icon name="pluscircleo" size={30} color="#000"></Icon>
            )
        }
    },
    Classement: {
        screen: ClassementStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <Icon name="star" size={30} color="#000"></Icon>
                : <Icon name="staro" size={30} color="#000"></Icon>
            )
        }
    },
    FriendsAndProfil: {
        screen: FriendsAndProfilStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <IconAwesome name="user" size={30} color="#000"></IconAwesome>
                : <IconAwesome name="user-o" size={30} color="#000"></IconAwesome>
            )
        }
    }
    },
    {
        tabBarOptions : {
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