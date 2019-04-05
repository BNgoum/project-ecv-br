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

import FriendsAndProfil from '../Screens/FriendsProfil/FriendsAndProfil'
import ResearchFriends from '../Screens/FriendsProfil/ResearchFriends'

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
            headerTintColor: {
                color: '#fff'
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
            headerTintColor: {
                color: '#fff'
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

const TabBarNavigator = createBottomTabNavigator({
    Accueil: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <Image style={styles.icon} source={require('../../../assets/images/tab_bar/home_active.png')}/>
                : <Image style={styles.icon} source={require('../../../assets/images/tab_bar/home_inactive.png')}/>
            )
        }
    },
    Matchs: {
        screen: MatchsInComingStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <Image style={styles.icon} source={require('../../../assets/images/tab_bar/match_active.png')}/>
                : <Image style={styles.icon} source={require('../../../assets/images/tab_bar/match_inactive.png')}/>
            )
        }
    },
    NewBR: {
        screen: CreateBetRoomStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <Image style={styles.icon} source={require('../../../assets/images/tab_bar/add_active.png')}/>
                : <Image style={styles.icon} source={require('../../../assets/images/tab_bar/add_inactive.png')}/>
            )
        }
    },
    Classement: {
        screen: ClassementStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <Image style={styles.icon} source={require('../../../assets/images/tab_bar/classement_active.png')}/>
                : <Image style={styles.icon} source={require('../../../assets/images/tab_bar/classement_inactive.png')}/>
            )
        }
    },
    FriendsAndProfil: {
        screen: FriendsAndProfilStack,
        navigationOptions: {
            tabBarIcon: ({ focused }) =>  (
                focused
                ? <Image style={ styles.icon } source={require('../../../assets/images/tab_bar/profil_active.png')} resizeMode={"contain"}/>
                : <Image style={ styles.icon } source={require('../../../assets/images/tab_bar/profil_inactive.png')} resizeMode={"contain"}/>
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
      width: 23,
      height: 23
    }
})

export default AppContainer;