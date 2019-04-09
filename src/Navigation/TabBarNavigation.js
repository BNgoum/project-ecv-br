import React from 'react'
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { StyleSheet, View } from 'react-native'

import Home from '../Screens/Home'
import BetRoomDetails from '../Screens/BetRoom/BetRoomDetails'
import MatchsInComing from '../Screens/MatchsInComing'
import NewBetRoom from '../Screens/BetRoom/NewBetRoom'
import Rewards from '../Screens/BetRoom/Rewards'
import FriendsBetRoom from '../Screens/BetRoom/Friends'
import MatchsBetRoom from '../Screens/BetRoom/Match'
import Classement from '../Screens/Classement'

import FriendsAndProfil from '../Screens/FriendsProfil/FriendsAndProfil'
import ResearchFriends from '../Screens/FriendsProfil/ResearchFriends'

import { Home_inactif, Home_actif, Match_inactif, Match_actif, Classement_inactif, Classement_actif, Profil_inactif, Profil_actif, New_actif, New_inactif } from '../Images/tabbar_icons';

const HomeStack = createStackNavigator({
    Home : {
        screen: Home,
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
            },
            headerBackTitle: null
        }
    },
    BetRoomDetails : {
        screen: BetRoomDetails,
        navigationOptions: {
            title: 'BET ROOM',
            headerTitleStyle: {
                color: '#fff'
            },
             headerStyle: {
                backgroundColor: '#151830'
            }            
        }
    }    
},
{
    cardStyle: { backgroundColor: '#151830' }
}
)

const MatchsInComingStack = createStackNavigator({
    Matchs : {
        screen: MatchsInComing,
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
            },
            headerBackTitle: null,
        }
    }
},
{
    cardStyle: { backgroundColor: '#151830' }
})

const CreateBetRoomStack = createStackNavigator({
    NewBetRoom : {
        screen: NewBetRoom,
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
            },
            headerBackTitle: null,
        }
    },
    Rewards: {
        screen: Rewards,
        navigationOptions: {
            title: 'BET ROOM',
            headerTitleStyle: {
                color: '#fff'
            },
            headerStyle: {
                backgroundColor: '#151830'
            },
            headerBackTitle: null,
        }
    },
    Friends: {
        screen: FriendsBetRoom,
        navigationOptions: {
            title: 'BET ROOM',
            headerTitleStyle: {
                color: '#fff'
            },
            headerStyle: {
                backgroundColor: '#151830'
            },
            headerBackTitle: null,
        }
    },
    MatchsBR: {
        screen: MatchsBetRoom,
        navigationOptions: {
            title: 'BET ROOM',
            headerTitleStyle: {
                color: '#fff'
            },
            headerStyle: {
                backgroundColor: '#151830'
            },
            headerBackTitle: null,
        }
    }
},
{
    cardStyle: { backgroundColor: '#151830' }
})

const ClassementStack = createStackNavigator({
    Classement : {
        screen: Classement,
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
            },
            headerBackTitle: null,
        }
    }
},
{
    cardStyle: { backgroundColor: '#151830' }
})

const FriendsAndProfilStack = createStackNavigator({
    FriendsAndProfil : {
        screen: FriendsAndProfil,
        navigationOptions: {
            title: 'BET ROOM',
            headerBackTitle: null,
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
    },
    ResearchFriends : {
        screen: ResearchFriends,
        navigationOptions: {
            title: 'BET ROOM',
            headerBackTitle: null,
            headerTitleStyle: {
                color: '#fff'
            },
            headerStyle: {
                backgroundColor: '#151830'
            }
        }
    }
},
{
    cardStyle: { backgroundColor: '#151830' }
})

const TabBarNavigator = createBottomTabNavigator({
    Accueil: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <View style={ styles.icon }><Home_actif  /></View>
                : <View style={ styles.icon }><Home_inactif /></View>
            )
        }
    },
    Matchs: {
        screen: MatchsInComingStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <View style={ styles.icon }><Match_actif /></View>
                : <View style={ styles.icon }><Match_inactif /></View>
            )
        }
    },
    NewBR: {
        screen: CreateBetRoomStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <View style={ styles.icon }><New_actif /></View>
                : <View style={ styles.icon }><New_inactif /></View>
            )
        }
    },
    Classement: {
        screen: ClassementStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <View style={ styles.icon }><Classement_actif /></View>
                : <View style={ styles.icon }><Classement_inactif /></View>
            )
        }
    },
    FriendsAndProfil: {
        screen: FriendsAndProfilStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <View style={ styles.icon }><Profil_actif /></View>
                : <View style={ styles.icon }><Profil_inactif /></View>
            )
        }
    }
    },
    {
        tabBarOptions : {
            showLabel: false,
            showIcon: true,
            style: {
                backgroundColor: '#10122d',
            },
        }
    }
)

const AppContainer = createAppContainer(TabBarNavigator);

const styles = StyleSheet.create({
    icon: {
      overflow: 'hidden'
    }
})

export default AppContainer;