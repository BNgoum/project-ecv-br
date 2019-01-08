import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';


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
            <View>
                <TouchableOpacity 
                    onPress={() => this.handleOnPress()} 
                    style={ [styles.wrapperButtonFriend, this.state.active ? styles.wrapperButtonFriendSelected : null] }>
                    <Text style={ styles.friendsName }>{friend.pseudo}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    wrapperButtonFriend: {
        margin: 16
    },
    wrapperButtonFriendSelected: {
        backgroundColor: '#ccc',
    },
    friendsName: {
        fontSize: 20,
        borderWidth: 1,
        padding: 16,
        borderColor: '#ccc'
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