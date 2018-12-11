import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

import Profil from '../Components/Profil/Profil';
import Friends from '../Components/Friends/Friends';

class FriendsAndProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexScreen: 0
        }
    }

    handleSwipeScreen = (index) => { this.setState({indexScreen: index}) }
    
    render() {
        return (
            <View style={styles.wrapperSlider}>
                <Swiper index={this.state.indexScreen} style={styles.wrapper}>
                    <View style={styles.profilSlide}>
                        <TouchableOpacity onPress={() => this.handleSwipeScreen(0)} style={styles.buttonFriends}>
                            <Image style={styles.pictoFriends} source={require('../Images/profil_friends/network.png')}/>
                        </TouchableOpacity>
                        <Profil />
                    </View>
                    <View style={styles.friendsSlide}>
                        <TouchableOpacity onPress={() => this.handleSwipeScreen(1)} style={styles.buttonFriends}>
                            <Text>Mon profil</Text>
                        </TouchableOpacity>
                        <Friends />
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