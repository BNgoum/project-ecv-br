import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import TextRegular from '../Style/TextRegular';
import TextBold from '../Style/TextBold';
import { AntDesign } from '@expo/vector-icons';

class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        }
    }

    handleOnPress = () => {
        return new Promise((resolve, reject) => {
            resolve(this.setState({ active: !this.state.active }));
        })
        .then(() => {
            let arrayParticipants = this.props.state.BetRoomReducer.participants;
    
            if (this.state.active) {
                arrayParticipants.push(this.props.data._id);
    
                const action = { type: "ADD_PARTICIPANT", value: arrayParticipants }
                this.props.dispatch(action);
            } else { // Suppression d'un partcipant
                // On vérifie que l'id du partcipant à supprimer soit bien dans le tableau des partcipants du redux
                const index = arrayParticipants.indexOf(this.props.data._id);
                if (index > -1) { arrayParticipants.splice(index, 1); }

                const action = { type: "DELETE_PARTICIPANT", value: arrayParticipants }
                this.props.dispatch(action);
            }
        })
        .catch((error) => console.log('Erreur lors du handleOnPress Friend.js BetRoom : ', error))
    }

    render() {
        const friend = this.props.data;
        return (
            <TouchableOpacity 
                onPress={() => this.handleOnPress()} 
                style={ [styles.container, this.state.active && styles.wrapperButtonFriendSelected] }>
                {/* <Text style={ styles.friendsName }>{friend.pseudo}</Text> */}

                <View style={ styles.avatar }>
                    <AntDesign name="user" size={32} color="black" />
                </View>
                <View style={ styles.wrapperText }>
                    <TextBold style={styles.pseudo} >{friend.pseudo}</TextBold>
                    <TextRegular style={styles.sousTexte} >4 Bet Rooms joués ensemble</TextRegular>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        borderRadius: 4,
        backgroundColor: '#242647',
        paddingHorizontal: 20,
        paddingVertical: 12
    },
    buttonFriend: {
        backgroundColor: '#FFF',
        padding: 16,
        marginTop: 16
    },
    buttonFriendSelected: {
        backgroundColor: '#ccc',
        padding: 16,
        marginTop: 16
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        marginRight: 20
    },
    wrapperButtonFriendSelected: {
        borderColor: '#fff',
        borderWidth: 2
    },
    wrapperText: {
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    pseudo: {
        fontSize: 16
    },
    sousTexte: {
        fontSize: 12
    }
})

const mapStateToProps = (state) => { 
    return {state};
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Friend)