import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

class FriendsAndProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
    
    render() {
        return (
            <View style={styles.wrapperSlider}>
                <Swiper style={styles.wrapper}>
                    <View style={styles.friendsSlide}>
                        <Text style={styles.title}>Friends screen</Text>
                    </View>
                    <View style={styles.profilSlide}>
                        <Text style={styles.title}>Profil Screen</Text>
                        <TouchableOpacity style={styles.buttonDisconnect} onPress={this.disconnect}><Text style={styles.textDisconnect}>Se déconnecter</Text></TouchableOpacity>
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