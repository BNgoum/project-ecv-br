import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

class FriendsAndProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexScreen: 0
        }
    }

    disconnect = () => {
        const action = {
            type: "TO_DISCONNECT", value: null
        }

        return new Promise((resolve, reject) => {
            resolve(this.props.dispatch(action));
        }).then(() => this.props.navigation.navigate('Connexion'))
        .catch((err) => reject('Erreur lors de la déconnexion : ', err));
    }

    handleSwipeScreen = (index) => {
        this.setState({indexScreen: index})
    }
    
    render() {
        return (
            <View style={styles.wrapperSlider}>
                <Swiper index={this.state.indexScreen} style={styles.wrapper}>
                    <View style={styles.profilSlide}>
                        <TouchableOpacity onPress={() => this.handleSwipeScreen(0)} style={styles.buttonFriends}><Image style={styles.pictoFriends} source={require('../Images/profil_friends/network.png')}/></TouchableOpacity>
                        <Text style={styles.title}>Profil Screen</Text>
                        <TouchableOpacity style={styles.buttonDisconnect} onPress={this.disconnect}><Text style={styles.textDisconnect}>Se déconnecter</Text></TouchableOpacity>
                    </View>
                    <View style={styles.friendsSlide}>
                        <Text style={styles.title}>Friends screen</Text>
                        <TouchableOpacity onPress={() => this.handleSwipeScreen(1)} style={styles.buttonDisconnect}><Text style={styles.textDisconnect}>To friends</Text></TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapperSlider: {
        display: 'flex',
        flex: 1,
        
        backgroundColor: "#dedede"
    },  
    title: {
        alignSelf: 'center',
        fontSize: 22
    },
    friendsSlide: {

    },
    profilSlide: {

    },
    buttonDisconnect: {
        backgroundColor: '#dedede',
        padding: 16,
        width: 200,
        alignSelf: 'center'
    },
    textDisconnect: {
        alignSelf: 'center',
        fontSize: 16
    },
    buttonFriends: {
        alignSelf: 'flex-end',
        marginTop: 8,
        marginRight: 8
    },
    pictoFriends: {
        width: 40,
        height: 40
    }
})

const mapStateToProps = (state) => { 
    return { state: state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsAndProfil)